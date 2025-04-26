import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { JellifyTrack } from '../types/JellifyTrack'
import { storage } from '../constants/storage'
import { MMKVStorageKeys } from '../enums/mmkv-storage-keys'
import TrackPlayer, {
	Event,
	State,
	usePlaybackState,
	useTrackPlayerEvents,
} from 'react-native-track-player'
import { isEqual, isUndefined } from 'lodash'
import { handlePlaybackProgressUpdated, handlePlaybackState } from './handlers'
import { useUpdateOptions } from '../player/hooks'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { trigger } from 'react-native-haptic-feedback'
import { pause, seekTo } from 'react-native-track-player/lib/src/trackPlayer'
import { convertRunTimeTicksToSeconds } from '../helpers/runtimeticks'
import Client from '../api/client'

import { getPlaystateApi } from '@jellyfin/sdk/lib/utils/api'
import { useNetworkContext } from '../components/Network/provider'
import { useQueueContext } from './queue-provider'

interface PlayerContext {
	initialized: boolean
	nowPlayingIsFavorite: boolean
	setNowPlayingIsFavorite: React.Dispatch<SetStateAction<boolean>>
	nowPlaying: JellifyTrack | undefined
	useStartPlayback: UseMutationResult<void, Error, void, unknown>
	useTogglePlayback: UseMutationResult<void, Error, void, unknown>
	useSeekTo: UseMutationResult<void, Error, number, unknown>
}

const PlayerContextInitializer = () => {
	const nowPlayingJson = storage.getString(MMKVStorageKeys.NowPlaying)

	const playStateApi = getPlaystateApi(Client.api!)

	//#region State
	const [initialized, setInitialized] = useState<boolean>(false)

	const [nowPlayingIsFavorite, setNowPlayingIsFavorite] = useState<boolean>(false)
	const [nowPlaying, setNowPlaying] = useState<JellifyTrack | undefined>(
		nowPlayingJson ? JSON.parse(nowPlayingJson) : undefined,
	)

	const { playQueue, currentIndex } = useQueueContext()

	//#endregion State

	//#region Functions
	const play = async () => {
		await TrackPlayer.play()
	}

	//#endregion Functions

	//#region Hooks
	const useStartPlayback = useMutation({
		mutationFn: play,
	})

	const useTogglePlayback = useMutation({
		mutationFn: () => {
			trigger('impactMedium')
			if (playbackState === State.Playing) return pause()
			else return play()
		},
	})

	const useSeekTo = useMutation({
		mutationFn: async (position: number) => {
			trigger('impactLight')
			await seekTo(position)

			handlePlaybackProgressUpdated(Client.sessionId, playStateApi, nowPlaying!, {
				buffered: 0,
				position,
				duration: convertRunTimeTicksToSeconds(nowPlaying!.duration!),
			})
		},
	})
	//#endregion

	//#region RNTP Setup

	const { state: playbackState } = usePlaybackState()
	const { useDownload, downloadedTracks, networkStatus } = useNetworkContext()

	useTrackPlayerEvents(
		[
			Event.RemoteLike,
			Event.RemoteDislike,
			Event.PlaybackProgressUpdated,
			Event.PlaybackState,
			Event.PlaybackActiveTrackChanged,
		],
		async (event) => {
			switch (event.type) {
				case Event.RemoteLike: {
					setNowPlayingIsFavorite(true)
					break
				}

				case Event.RemoteDislike: {
					setNowPlayingIsFavorite(false)
					break
				}

				case Event.PlaybackState: {
					handlePlaybackState(
						Client.sessionId,
						playStateApi,
						(await TrackPlayer.getActiveTrack()) as JellifyTrack,
						event.state,
					)
					break
				}
				case Event.PlaybackProgressUpdated: {
					handlePlaybackProgressUpdated(
						Client.sessionId,
						playStateApi,
						nowPlaying!,
						event,
					)

					// Cache playing track at 20 seconds if it's not already downloaded
					if (
						Math.floor(event.position) === 20 &&
						downloadedTracks?.filter(
							(download) => download.item.Id === nowPlaying!.item.Id,
						).length === 0
					)
						useDownload.mutate(nowPlaying!.item)

					break
				}

				case Event.PlaybackActiveTrackChanged: {
					if (initialized) {
						const activeTrack = (await TrackPlayer.getActiveTrack()) as
							| JellifyTrack
							| undefined
						if (activeTrack && !isEqual(activeTrack, nowPlaying)) {
							setNowPlaying(activeTrack)

							// Set player favorite state to user data IsFavorite
							// This is super nullish so we need to do a lot of
							// checks on the fields
							// TODO: Turn this check into a helper function
							setNowPlayingIsFavorite(
								isUndefined(activeTrack)
									? false
									: isUndefined(activeTrack!.item.UserData)
									? false
									: activeTrack.item.UserData.IsFavorite ?? false,
							)

							await useUpdateOptions(nowPlayingIsFavorite)
						} else if (!activeTrack) {
							setNowPlaying(undefined)
							setNowPlayingIsFavorite(false)
						} else {
							// Do nothing
						}
					}
				}
			}
		},
	)

	//#endregion RNTP Setup

	//#region useEffects

	useEffect(() => {
		if (initialized && nowPlaying)
			storage.set(MMKVStorageKeys.NowPlaying, JSON.stringify(nowPlaying))
	}, [nowPlaying])

	useEffect(() => {
		if (!initialized && playQueue.length > 0 && nowPlaying) {
			TrackPlayer.skip(playQueue.findIndex((track) => track.item.Id! === nowPlaying.item.Id!))
		}

		setInitialized(true)
	}, [playQueue, nowPlaying])

	useEffect(() => {
		if (currentIndex > -1 && playQueue.length > currentIndex)
			console.debug(`Setting now playing to queue index ${currentIndex}`)
		setNowPlaying(playQueue[currentIndex])
	}, [currentIndex])
	//#endregion useEffects

	//#region return
	return {
		initialized,
		nowPlayingIsFavorite,
		setNowPlayingIsFavorite,
		nowPlaying,
		useStartPlayback,
		useTogglePlayback,
		useSeekTo,
		playbackState,
	}
	//#endregion return
}

//#region Create PlayerContext
export const PlayerContext = createContext<PlayerContext>({
	initialized: false,
	nowPlayingIsFavorite: false,
	setNowPlayingIsFavorite: () => {},
	nowPlaying: undefined,
	useStartPlayback: {
		mutate: () => {},
		mutateAsync: async () => {},
		data: undefined,
		error: null,
		variables: undefined,
		isError: false,
		isIdle: true,
		isPaused: false,
		isPending: false,
		isSuccess: false,
		status: 'idle',
		reset: () => {},
		context: {},
		failureCount: 0,
		failureReason: null,
		submittedAt: 0,
	},
	useTogglePlayback: {
		mutate: () => {},
		mutateAsync: async () => {},
		data: undefined,
		error: null,
		variables: undefined,
		isError: false,
		isIdle: true,
		isPaused: false,
		isPending: false,
		isSuccess: false,
		status: 'idle',
		reset: () => {},
		context: {},
		failureCount: 0,
		failureReason: null,
		submittedAt: 0,
	},
	useSeekTo: {
		mutate: () => {},
		mutateAsync: async () => {},
		data: undefined,
		error: null,
		variables: undefined,
		isError: false,
		isIdle: true,
		isPaused: false,
		isPending: false,
		isSuccess: false,
		status: 'idle',
		reset: () => {},
		context: {},
		failureCount: 0,
		failureReason: null,
		submittedAt: 0,
	},
})
//#endregion Create PlayerContext

export const PlayerProvider: ({ children }: { children: ReactNode }) => React.JSX.Element = ({
	children,
}: {
	children: ReactNode
}) => {
	const context = PlayerContextInitializer()

	return <PlayerContext.Provider value={context}>{children}</PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext)
