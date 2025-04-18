import { MMKV } from "react-native-mmkv";


import RNFS from 'react-native-fs';
import { JellifyTrack } from "@/types/JellifyTrack";
import { getLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import Client from "../../api/client";
import { Buffer } from 'buffer'
import axios from "axios";

export async function downloadJellyfinFile(url: string, fallbackName: string = 'audio') {
	try {
		// Fetch the file
		const response = await axios.get(url, {
			responseType: 'arraybuffer',
		});

		// Try to get extension from URL or headers
		const contentType = response.headers['content-type'];
		let extension = 'mp3'; // default fallback
        console.log("contentType", contentType)
		// Extract extension from content-type (e.g., "audio/m4a" -> "m4a")
		if (contentType && contentType.includes('/')) {
			const parts = contentType.split('/');
			extension = parts[1];
		}

		const fileName = `${fallbackName}.${extension}`;
		const path = `${RNFS.DocumentDirectoryPath}/${fileName}`;

		// Write to file
		await RNFS.writeFile(path, Buffer.from(response.data).toString('base64'), 'base64');
		console.log('File saved to:', path);
		return `file://${path}`;
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


export const saveAudio = async (track:JellifyTrack) => {
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
        
        const downloadtrack = await downloadJellyfinFile(track.url, track.item.Id as string);
        const dowloadalbum = await downloadJellyfinFile(track.artwork as string, track.item.Id as string);
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






