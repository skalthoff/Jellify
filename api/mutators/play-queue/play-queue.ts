/**
 * Represents the organized play queue of the current selection,
 */

import { useMutation } from "@tanstack/react-query";
import { useQueue } from "../../queries/queue";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyTrack } from "../../../types/JellifyTrack";
import { getQueue, remove } from "react-native-track-player/lib/src/trackPlayer";
import { storePlayQueue } from "./helpers/storage";
import { Track } from "react-native-track-player/lib/src/interfaces/Track";

export const removeFromQueue = useMutation({
    mutationFn: async (indexes: number[]) => {
        // Remove from the player first thing
        remove(indexes);
        let cachedQueue = await AsyncStorage.getItem(AsyncStorageKeys.PlayQueue);

        if (cachedQueue === null) {
            // Warn, not a showstopper as we'll just cache it at the end of this, this should hopefully never happen
            console.warn("Queue cache was null, setting...");

            storePlayQueue((await getQueue()) as JellifyTrack[]);
        } else {
            let queue : Array<JellifyTrack> = JSON.parse(cachedQueue);
            indexes.forEach(index => {
                queue.splice(index, 1); // Returns deleted queue items
            })
            storePlayQueue(queue);
        }
    },
    onError: () => {

    },
    onMutate: () => {

    },
    onSuccess: () => {

    }
})