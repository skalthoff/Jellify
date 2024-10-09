import { BaseItemDto, SongInfo } from "@jellyfin/sdk/lib/generated-client/models";
import { useQuery } from "@tanstack/react-query";
import { add, remove, removeUpcomingTracks } from "react-native-track-player/lib/src/trackPlayer";
import { QueryKeys } from "../../enums/query-keys";
import { JellifyTrack } from "../../types/JellifyTrack";
import { mapDtoToJellifyTrack } from "../../helpers/mappings";

export const useClearQueue = useQuery({
    queryKey: [],
    queryFn: () => {
        return removeUpcomingTracks();
    }
})

/**
 * Adds a song to the beginning of the queue
 * @param song The song to play next
 * @returns 
 */
export const playNext = (song: BaseItemDto) => addToQueue(song, 1);

/**
 * 
 * @param song The song to add to the queue
 * @param index The index position to slot the song in, where "0" is the currently playing track. Defaults to the end of the queue
 * @returns 
 */
export const addToQueue = (song: BaseItemDto, index: number | undefined) => useQuery({
    queryKey: [QueryKeys.AddToQueue, song.Id, index],
    queryFn: () => {
        return add(mapDtoToJellifyTrack(song), index)
    }
})

/**
 * Removes a singular song at the provided index from the queue
 * @param index The index of the song to remove
 * @returns 
 */
export const removeFromQueue = (index: number) => useQuery({
    queryKey: [QueryKeys.RemoveFromQueue, index],
    queryFn: ({ queryKey }) => {
        remove(index)
    }
})

/**
 * Removes multiple songs from the currently playing queue
 * @param indexes The song indexes to remove from the queue
 * @returns 
 */
export const removeMultipleFromQueue = (indexes: number[]) => useQuery({
    queryKey: [QueryKeys.RemoveMultipleFromQueue, indexes],
    queryFn: ({ queryKey }) => {
        remove(indexes);
    }
})