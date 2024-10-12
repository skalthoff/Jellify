import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../../enums/async-storage-keys";
import { JellifyTrack } from "../../../../types/JellifyTrack";

export async function storePlayQueue(queue: JellifyTrack[]) : Promise<void> {{
    return AsyncStorage.setItem(AsyncStorageKeys.PlayQueue, JSON.stringify(queue));
}}