/**
 * Represents the organized play queue of the current selection,
 */

import { useMutation } from "@tanstack/react-query";
import { JellifyTrack } from "../../types/JellifyTrack";
import { add, remove, removeUpcomingTracks } from "react-native-track-player/lib/src/trackPlayer";
import { findPlayNextIndexStart, findPlayQueueIndexStart } from "./helpers";
import { usePlayerContext } from "../provider";

/**
 * 
 */
export const addToPlayNext = useMutation({
    mutationFn: async (tracks: JellifyTrack[]) => {
        const { queue : playQueue, setQueue } = usePlayerContext();
        let insertIndex = findPlayNextIndexStart(playQueue);

        add(tracks, insertIndex);

        tracks.forEach(track => {
            playQueue.splice(insertIndex, 0, track);
        });

        setQueue(playQueue)
    }
});

/**
 * Adds additional tracks to the end of the user queue
 */
export const addToPlayQueue = useMutation({
    mutationFn: async (tracks: JellifyTrack[]) => {

        const { queue : playQueue, setQueue } = usePlayerContext();
        let insertIndex = findPlayQueueIndexStart(playQueue);

        add(tracks, insertIndex);

        tracks.forEach(track => {
            playQueue.splice(insertIndex, 0, track);
        });

        setQueue(playQueue)
    }
});

export const removeFromPlayQueue = useMutation({
    mutationFn: async (indexes: number[]) => {
        // Remove from the player first thing
        remove(indexes);
        let { queue, setQueue } = usePlayerContext();

        indexes.forEach(index => {
            queue.splice(index, 1); // Returns deleted queue items
        })
        setQueue(queue);
    },
    onError: () => {

    },
    onMutate: () => {

    },
    onSuccess: () => {

    }
});

export const clearPlayQueue = useMutation({
    mutationFn: async () => {
        const { setQueue } = usePlayerContext();
        removeUpcomingTracks()
        setQueue([]);
    }
})