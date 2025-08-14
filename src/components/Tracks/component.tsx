import React, { useCallback } from 'react'
import Track from '../Global/components/track'
import { getTokens, Separator } from 'tamagui'
import { BaseItemDto, UserItemDataDto } from '@jellyfin/sdk/lib/generated-client/models'
import { Queue } from '../../player/types/queue-item'
import { useNetworkContext } from '../../providers/Network'
import { queryClient } from '../../constants/query-client'
import { QueryKeys } from '../../enums/query-keys'
import { FlashList } from '@shopify/flash-list'

export default function Tracks({
	tracks,
	queue,
	fetchNextPage,
	hasNextPage,
	filterDownloaded,
	filterFavorites,
}: {
	tracks: BaseItemDto[] | undefined
	queue: Queue
	fetchNextPage: () => void
	hasNextPage: boolean
	filterDownloaded?: boolean | undefined
	filterFavorites?: boolean | undefined
}): React.JSX.Element {
	const { downloadedTracks } = useNetworkContext()

	const tracksToDisplay: () => BaseItemDto[] = useCallback(() => {
		if (filterDownloaded) {
			return (
				downloadedTracks
					?.map((downloadedTrack) => downloadedTrack.item)
					.filter((downloadedTrack) => {
						if (filterFavorites) {
							return (
								(
									queryClient.getQueryData([
										QueryKeys.UserData,
										downloadedTrack.Id,
									]) as UserItemDataDto | undefined
								)?.IsFavorite ?? false
							)
						}
						return true
					}) ?? []
			)
		}
		return tracks ?? []
	}, [filterDownloaded, downloadedTracks, tracks, filterFavorites])

	return (
		<FlashList
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{
				paddingVertical: getTokens().size.$1.val,
			}}
			ItemSeparatorComponent={() => <Separator />}
			numColumns={1}
			data={tracksToDisplay()}
			renderItem={({ index, item: track }) => (
				<Track
					showArtwork
					index={0}
					track={track}
					tracklist={tracksToDisplay().slice(index, index + 50)}
					queue={queue}
				/>
			)}
			onEndReached={() => {
				if (hasNextPage) fetchNextPage()
			}}
			removeClippedSubviews
		/>
	)
}
