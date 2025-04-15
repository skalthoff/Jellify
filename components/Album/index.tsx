import { HomeAlbumProps } from '../types'
import { YStack, XStack, Separator, getToken } from 'tamagui'
import { ItemSortBy } from '@jellyfin/sdk/lib/generated-client/models'
import { H5, Text } from '../Global/helpers/text'
import { FlatList, SectionList } from 'react-native'
import { RunTimeTicks } from '../Global/helpers/time-codes'
import Track from '../Global/components/track'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import FavoriteButton from '../Global/components/favorite-button'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { getImageApi, getItemsApi } from '@jellyfin/sdk/lib/utils/api'
import Client from '../../api/client'
import { useEffect, useMemo } from 'react'
import { ItemCard } from '../Global/components/item-card'
import { Image } from 'expo-image'
import { groupBy, isEqual } from 'lodash'

export function AlbumScreen({ route, navigation }: HomeAlbumProps): React.JSX.Element {
	const { album } = route.params

	navigation.setOptions({
		headerRight: () => {
			return <FavoriteButton item={album} />
		},
	})
	const { width } = useSafeAreaFrame()

	const { data: tracks } = useQuery({
		queryKey: [QueryKeys.ItemTracks, album.Id!],
		queryFn: () => {
			let sortBy: ItemSortBy[] = []

			sortBy = [ItemSortBy.ParentIndexNumber, ItemSortBy.IndexNumber, ItemSortBy.SortName]

			return getItemsApi(Client.api!)
				.getItems({
					parentId: album.Id!,
					sortBy,
				})
				.then(({ data }) => {
					return data.Items ? data.Items : []
				})
		},
	})

	return (
		<SectionList
			contentInsetAdjustmentBehavior='automatic'
			sections={
				tracks
					? Object.keys(groupBy(tracks, (track) => track.ParentIndexNumber ?? 0)).map(
							(discNumber, index) => {
								return {
									title: discNumber,
									data: tracks.filter((track) =>
										isEqual(
											discNumber,
											(track.ParentIndexNumber ?? 0).toString(),
										),
									),
								}
							},
					  )
					: [{ title: '1', data: [] }]
			}
			keyExtractor={(item, index) => item.Id! + index}
			ItemSeparatorComponent={() => <Separator />}
			renderSectionHeader={({ section }) => <Text bold>{`Disc ${section.title}`}</Text>}
			ListHeaderComponent={
				<YStack marginTop={'$2'} minHeight={getToken('$20') + getToken('$15')}>
					<Image
						source={getImageApi(Client.api!).getItemImageUrlById(album.Id!)}
						style={{
							borderRadius: getToken('$5'),
							width: getToken('$20') + getToken('$15'),
							height: getToken('$20') + getToken('$15'),
							alignSelf: 'center',
						}}
					/>

					<H5 textAlign='center'>{album.Name ?? 'Untitled Album'}</H5>

					<XStack justifyContent='space-evenly'>
						<Text>{album.ProductionYear?.toString() ?? ''}</Text>
					</XStack>

					<FlatList
						style={{
							alignSelf: 'center',
						}}
						horizontal
						keyExtractor={(item) => item.Id!}
						data={album.ArtistItems}
						renderItem={({ index, item: artist }) => (
							<ItemCard
								size={'$8'}
								item={artist}
								caption={artist.Name ?? 'Unknown Artist'}
								onPress={() => {
									navigation.navigate('Artist', {
										artist,
									})
								}}
							/>
						)}
					/>
				</YStack>
			}
			renderItem={({ item: track, index }) => (
				<Track
					track={track}
					tracklist={tracks}
					index={index}
					navigation={navigation}
					queue={album}
				/>
			)}
			ListFooterComponent={
				<XStack marginRight={'$2'} justifyContent='flex-end'>
					<Text color={'$purpleGray'} paddingRight={'$1'}>
						Total Runtime:
					</Text>
					<RunTimeTicks>{album.RunTimeTicks}</RunTimeTicks>
				</XStack>
			}
			contentContainerStyle={{
				marginHorizontal: 4,
			}}
		/>
	)
}
