import _ from "lodash";
import { JellifyTrack } from "../../types/JellifyTrack";

export function buildNewQueue(existingQueue: JellifyTrack[], tracksToInsert: JellifyTrack[], insertIndex: number) {


    let newQueue : JellifyTrack[] = [];

    if (_.isEmpty(existingQueue))
        newQueue = tracksToInsert;
    else {
        newQueue = _.cloneDeep(existingQueue).splice(insertIndex, 0, ...tracksToInsert);
    }

    console.debug(`Setting queue: ${newQueue}`)

    return newQueue;
}