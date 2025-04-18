import { MMKV } from "react-native-mmkv";


import RNFS from 'react-native-fs';
import { JellifyTrack } from "@/types/JellifyTrack";
import { getLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import Client from "../../api/client";
import { Buffer } from 'buffer'
import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/constants/query-client";

export async function downloadJellyfinFile(url: string, name: string,queryClient: QueryClient) {
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

		// Step 3: Build path
		const fileName = `${name}.${extension}`
		const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`

        queryClient.setQueryData(['downloads'], (prev: any = {}) => ({
			...prev,
			[url]: { progress: 0, name: fileName , songName: name},
		}))


		// Step 4: Start download with progress
		const options = {
			fromUrl: url,
			toFile: downloadDest,
			begin: (res: any) => {
				console.log('Download started')
			},
			progress: (data: any) => {
				const percent = +(data.bytesWritten / data.contentLength).toFixed(2)
				queryClient.setQueryData(['downloads'], (prev: any = {}) => ({
					...prev,
					[url]: { progress: percent, name: fileName , songName: name},
				}))
			},
			background: true,
			progressDivider: 1,
		}

		const result = await RNFS.downloadFile(options).promise
		console.log('Download complete:', result)
		return `file://${downloadDest}`
	} catch (error) {
		console.error('Download failed:', error);
		throw error;
	}
}




const mmkv  = new MMKV({
    id: "offlineMode",
    encryptionKey: "offlineMode",
})

const MMKV_OFFLINE_MODE_KEYS={
    "AUDIO_CACHE": "audioCache",
}


export const saveAudio = async (track:JellifyTrack,queryClient: QueryClient) => {
    const existingRaw = mmkv.getString(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
    let existingArray: JellifyTrack[] = []
    try{
        if(existingRaw){
            existingArray = JSON.parse(existingRaw)
        }
    }catch(error){
        //Ignore
    }
    try{    
        console.log("Downloading audio", track)
        
        const downloadtrack = await downloadJellyfinFile(track.url, track.item.Id as string,queryClient);
        const dowloadalbum = await downloadJellyfinFile(track.artwork as string, track.item.Id as string,queryClient);
        console.log("downloadtrack", downloadtrack)
        if(downloadtrack){
            track.url = downloadtrack;
            track.artwork= dowloadalbum;
        }
    }catch(error){
        console.error(error)
    }
   
    


  

    const index = existingArray.findIndex((t) => t.item.Id === track.item.Id)
  
    if (index >= 0) {
      // Replace existing
      existingArray[index] = track
    } else {
      // Add new
      existingArray.push(track)
    }
    mmkv.set(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE, JSON.stringify(existingArray))
    
}

export const getAudioCache =  (): JellifyTrack[] => {
    const existingRaw = mmkv.getString(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
    let existingArray: JellifyTrack[] = []
    try{
        if(existingRaw){
            existingArray = JSON.parse(existingRaw)
        }
    }catch(error){
        //Ignore
    }
    return existingArray;
}



export const deleteAudioCache = async () => {
  
    mmkv.delete(MMKV_OFFLINE_MODE_KEYS.AUDIO_CACHE)
}




