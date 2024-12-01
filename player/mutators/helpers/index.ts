import { QueuingType } from "../../../enums/queuing-type";
import { JellifyTrack } from "../../../types/JellifyTrack";

/**
 * Finds and returns the index of the player queue to insert additional tracks into
 * @param playQueue The current player queue
 * @returns The index to insert songs to play next at
 */
export const findPlayNextIndexStart = (playQueue: JellifyTrack[]) => {
    if (playQueue.length > 0)
        return 1

    return 0;
}

/**
 * Finds and returns the index of the play queue to insert user queue tracks into 
 * @param playQueue The current player queue
 * @returns The index to insert songs to add to the user queue
 */
export const findPlayQueueIndexStart = (playQueue: JellifyTrack[]) => {

    if (playQueue.length === 0)
        return 0;


    return playQueue.findIndex(queuedTrack => queuedTrack.QueuingType === QueuingType.FromSelection);
}