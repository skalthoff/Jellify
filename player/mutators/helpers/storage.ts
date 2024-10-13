import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../../enums/async-storage-keys";
import { JellifyTrack } from "../../../../types/JellifyTrack";

/**
 * Stores the play queue for referencing in the UI and for loading at launch
 * @param queue The queue of tracks to store
 * @returns 
 */
export async function storePlayQueue(queue: JellifyTrack[]) : Promise<void> {
    return AsyncStorage.setItem(AsyncStorageKeys.PlayQueue, JSON.stringify(queue));
}

/**
 * Fetches the stored play queue for referencing in the UI and for loading at launch
 * @returns An array of the stored tracks or an empty array if nothing is stored
 */
export async function fetchPlayQueue() : Promise<JellifyTrack[]> {

    let storedQueue = await AsyncStorage.getItem(AsyncStorageKeys.PlayQueue);

    return storedQueue != null ? JSON.parse(storedQueue as string) : [];
}