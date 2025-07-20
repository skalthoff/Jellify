import _, { isNull, isUndefined } from 'lodash'
import JellifyTrack from '../../../types/JellifyTrack'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { JellifyDownload } from '../../../types/JellifyDownload'
import { networkStatusTypes } from '../../../components/Network/internetConnectionWatcher'
import { QueuingType } from '../../../enums/queuing-type'

export function buildNewQueue(
	existingQueue: JellifyTrack[],
	tracksToInsert: JellifyTrack[],
	insertIndex: number,
) {
	console.debug(`Building new queue`)

	let newQueue: JellifyTrack[] = []

	if (_.isEmpty(existingQueue)) {
		newQueue = tracksToInsert
	} else {
		newQueue = _.cloneDeep(existingQueue)
		newQueue.splice(insertIndex, 0, ...tracksToInsert)
	}

	console.debug(`Built new queue of ${newQueue.length} items`)

	return newQueue
}

export function filterTracksOnNetworkStatus(
	networkStatus: networkStatusTypes | undefined | null,
	queuedItems: BaseItemDto[],
	downloadedTracks: JellifyDownload[],
) {
	if (
		isUndefined(networkStatus) ||
		isNull(networkStatus) ||
		networkStatus === networkStatusTypes.ONLINE
	)
		return queuedItems
	else
		return queuedItems.filter((item) =>
			downloadedTracks.map((download) => download.item.Id).includes(item.Id),
		)
}

/**
 * Fetches the manually queued tracks from the queue
 * @param queue The queue to fetch the manually queued tracks from
 * @returns The manually queued tracks
 */
export function fetchManuallyQueuedTracks(queue: JellifyTrack[]): JellifyTrack[] {
	return queue.filter(
		(track) =>
			track.QueuingType === QueuingType.PlayingNext ||
			track.QueuingType === QueuingType.DirectlyQueued,
	)
}
