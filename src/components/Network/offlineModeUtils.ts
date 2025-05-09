import { MMKV } from 'react-native-mmkv'

import RNFS from 'react-native-fs'
import { JellifyTrack } from '../../types/JellifyTrack'
import axios from 'axios'
import { QueryClient } from '@tanstack/react-query'
import { JellifyDownload } from '../../types/JellifyDownload'
import DownloadProgress from '../../types/DownloadProgress'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'

export async function downloadJellyfinFile(
	url: string,
	id: string, // unique track or artwork id
	title: string, // track title
	queryClient: QueryClient,
	suffix: string = '', // optional suffix for artwork
) {
	try {
		// Fetch the file
		const headRes = await axios.head(url)
		const contentType = headRes.headers['content-type']
		console.log('Content-Type:', contentType)

		// Step 2: Get extension from content-type
		let extension = 'mp3' // default
		if (contentType && contentType.includes('/')) {
			const parts = contentType.split('/')
			extension = parts[1].split(';')[0] // handles "audio/m4a; charset=utf-8"
		}

		// Sanitize title for file system
		const safeTitle = title.replace(/[^a-zA-Z0-9-_]/g, '_')
		const fileName = `${safeTitle}_${id}${suffix}.${extension}`
		const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`

		queryClient.setQueryData(['downloads'], (prev: DownloadProgress) => ({
			...prev,
			[url]: { progress: 0, name: fileName, songName: title },
		}))

		// Step 4: Start download with progress
		const options = {
			fromUrl: url,
			toFile: downloadDest,

			/* eslint-disable @typescript-eslint/no-explicit-any */
			begin: (res: any) => {
				console.log('Download started')
			},
			progress: (data: any) => {
				const percent = +(data.bytesWritten / data.contentLength).toFixed(2)

				queryClient.setQueryData(['downloads'], (prev: DownloadProgress) => ({
					...prev,
					[url]: { progress: percent, name: fileName, songName: title },
				}))
			},
			background: true,
			progressDivider: 1,
		}

		const result = await RNFS.downloadFile(options).promise
		console.log('Download complete:', result)

		return `file://${downloadDest}`
	} catch (error: any) {
		if (axios.isAxiosError(error)) {
			console.error('Axios network error when downloading:', url)
			console.error('Axios error message:', error.message)
			if (error.response) {
				console.error('Axios response status:', error.response.status)
				console.error('Axios response data:', error.response.data)
			}
		} else {
			console.error('Download failed:', error)
		}
		throw error
	}
}

const mmkv = new MMKV({
	id: 'offlineMode',
	encryptionKey: 'offlineMode',
})

const MMKV_OFFLINE_MODE_KEYS = {
	AUDIO_CACHE: 'audioCache',
	AUDIO_CACHE_LIMIT: 'audioCacheLimit',
}

export const getDefaultAudioCacheLimit = () => {
	if (!mmkv.contains(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE_LIMIT)) {
		mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE_LIMIT, 20)
	}
}

getDefaultAudioCacheLimit()
const AUDIO_CACHE_LIMIT = mmkv.getNumber(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE_LIMIT)

export const saveAudio = async (
	track: JellifyTrack,
	queryClient: QueryClient,
	isAutoDownloaded: boolean = true,
) => {
	if (
		isAutoDownloaded &&
		AUDIO_CACHE_LIMIT &&
		(!Number.isFinite(AUDIO_CACHE_LIMIT) || AUDIO_CACHE_LIMIT <= 0)
	) {
		// If the cache limit is not set or is not a number, or is less than 0, Dont Auto Download
		return
	}

	const existingRaw = mmkv.getString(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
	let existingArray: JellifyDownload[] = []
	try {
		if (existingRaw) {
			existingArray = JSON.parse(existingRaw)
		}
	} catch (error) {
		//Ignore
	}

	try {
		console.log('Downloading audio', track)

		// Use unique track ID for file naming
		const trackId = track.Id || track.item.Id
		const safeTitle = (track.title || track.item.Name || 'track').replace(
			/[^a-zA-Z0-9-_]/g,
			'_',
		)

		const downloadtrack = await downloadJellyfinFile(
			track.url,
			trackId as string, // unique track ID
			safeTitle,
			queryClient,
		)
		let downloadartwork = undefined
		if (track.artwork) {
			downloadartwork = await downloadJellyfinFile(
				track.artwork as string,
				trackId as string, // unique track ID for artwork too
				safeTitle,
				queryClient,
				'_artwork',
			)
		}
		console.log('downloadtrack', downloadtrack)
		if (downloadtrack) {
			track.url = downloadtrack
			track.artwork = downloadartwork
		}

		// Use a unique key for each downloaded track: track.Id (not album Id)
		const uniqueTrackId = track.Id || track.item.Id
		const index = existingArray.findIndex((t) => (t.Id || t.item.Id) === uniqueTrackId)

		if (index >= 0) {
			// Replace existing
			existingArray[index] = {
				...track,
				savedAt: new Date().toISOString(),
				isAutoDownloaded,
				path: downloadtrack,
			}
		} else {
			// Add new
			existingArray.push({
				...track,
				savedAt: new Date().toISOString(),
				isAutoDownloaded,
				path: downloadtrack,
			})
		}
	} catch (error) {
		console.error(error)
	}
	mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE, JSON.stringify(existingArray))
}

export const deleteAudio = async (trackItem: BaseItemDto) => {
	const downloads = getAudioCache()

	const download = downloads.filter((download) => download.item.Id === trackItem.Id)

	if (download.length === 1) {
		RNFS.unlink(`${RNFS.DocumentDirectoryPath}/${download[0].item.Id}`)
		setAudioCache([
			...downloads.slice(0, downloads.indexOf(download[0])),
			...downloads.slice(downloads.indexOf(download[0]) + 1, downloads.length - 1),
		])
	}
}

const setAudioCache = (downloads: JellifyDownload[]) => {
	mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE, JSON.stringify(downloads))
}

export const getAudioCache = (): JellifyDownload[] => {
	const existingRaw = mmkv.getString(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
	let existingArray: JellifyDownload[] = []
	try {
		if (existingRaw) {
			existingArray = JSON.parse(existingRaw)
		}
	} catch (error) {
		//Ignore
	}
	return existingArray
}

export const deleteAudioCache = async () => {
	mmkv.delete(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
}

export const purneAudioCache = async () => {
	const existingRaw = mmkv.getString(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
	if (!existingRaw) return

	let existingArray: JellifyDownload[] = []

	try {
		existingArray = JSON.parse(existingRaw)
	} catch (e) {
		return
	}

	const autoDownloads = existingArray
		.filter((item) => item.isAutoDownloaded)
		.sort((a, b) => new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime()) // oldest first

	const excess = autoDownloads.length - (AUDIO_CACHE_LIMIT ?? 20)
	if (excess <= 0) return

	// Remove the oldest `excess` files
	const itemsToDelete = autoDownloads.slice(0, excess)
	for (const item of itemsToDelete) {
		// Delete audio file
		if (item.url && (await RNFS.exists(item.url))) {
			await RNFS.unlink(item.url).catch(() => {})
		}

		// Delete artwork
		if (item.artwork && (await RNFS.exists(item.artwork))) {
			await RNFS.unlink(item.artwork).catch(() => {})
		}

		// Remove from the existingArray
		existingArray = existingArray.filter((i) => i.item.Id !== item.item.Id)
	}

	mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE, JSON.stringify(existingArray))
}

export const setAudioCacheLimit = (limit: number) => {
	mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE_LIMIT, limit)
}

export const getAudioCacheLimit = () => {
	return mmkv.getNumber(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE_LIMIT)
}
