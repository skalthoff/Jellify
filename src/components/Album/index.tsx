import { HomeAlbumProps, StackParamList } from '../types'
import { YStack, XStack, Separator, getToken, Spacer } from 'tamagui'
import { H5, Text } from '../Global/helpers/text'
import { ActivityIndicator, FlatList, SectionList, useWindowDimensions } from 'react-native'
import { RunTimeTicks } from '../Global/helpers/time-codes'
import Track from '../Global/components/track'
import FavoriteButton from '../Global/components/favorite-button'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { ItemCard } from '../Global/components/item-card'
import { fetchAlbumDiscs } from '../../api/queries/item'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InstantMixButton from '../Global/components/instant-mix-button'
import ItemImage from '../Global/components/image'
import React from 'react'
import { useJellifyContext } from '../provider'
import IconButton from '../Global/helpers/icon-button'
import { useNetworkContext } from '../Network/provider'

/**
 * The screen for an Album's track list
 *
 * @param route The route object from the parent screen,
 * containing the {@link BaseItemDto} of the album to display in the params
 *
 * @param navigation The navigation object from the parent screen
 *
 * @returns A React component
 */
export function AlbumScreen({ route, navigation }: HomeAlbumProps): React.JSX.Element {
	const { album } = route.params

	const { api } = useJellifyContext()

	const { data: discs, isPending } = useQuery({
		queryKey: [QueryKeys.ItemTracks, album.Id!],
		queryFn: () => fetchAlbumDiscs(api, album),
	})

	return (
		<SectionList
			contentInsetAdjustmentBehavior='automatic'
			sections={discs ? discs : [{ title: '1', data: [] }]}
			keyExtractor={(item, index) => item.Id! + index}
			ItemSeparatorComponent={() => <Separator />}
			renderSectionHeader={({ section }) => {
				return discs && discs.length >= 2 ? (
					<Text
						paddingVertical={'$2'}
						paddingLeft={'$4.5'}
						backgroundColor={'$background'}
						bold
					>{`Disc ${section.title}`}</Text>
				) : null
			}}
			ListHeaderComponent={() => AlbumTrackListHeader(album, navigation, discs)}
			renderItem={({ item: track, index }) => (
				<Track
					track={track}
					tracklist={discs?.flatMap((disc) => disc.data)}
					index={discs?.flatMap((disc) => disc.data).indexOf(track) ?? index}
					navigation={navigation}
					queue={album}
				/>
			)}
			ListFooterComponent={() => AlbumTrackListFooter(album, navigation)}
			ListEmptyComponent={() => (
				<YStack>
					{isPending ? (
						<ActivityIndicator size='large' color={'$background'} />
					) : (
						<Text>No tracks found</Text>
					)}
				</YStack>
			)}
		/>
	)
}

/**
 * Renders a header for an Album's track list
 * @param album The {@link BaseItemDto} of the album to render the header for
 * @param navigation The navigation object from the parent {@link AlbumScreen}
 * @returns A React component
 */
function AlbumTrackListHeader(
	album: BaseItemDto,
	navigation: NativeStackNavigationProp<StackParamList>,
	discs?: { title: string; data: BaseItemDto[] }[],
): React.JSX.Element {
	const { width } = useWindowDimensions()

	return (
		<YStack marginTop={'$4'} alignItems='center'>
			<XStack justifyContent='center'>
				<ItemImage item={album} width={'$20'} height={'$20'} />

				<Spacer />

				<YStack alignContent='center' justifyContent='center'>
					<H5
						lineBreakStrategyIOS='standard'
						textAlign='center'
						numberOfLines={5}
						minWidth={width / 2.25}
						maxWidth={width / 2.25}
					>
						{album.Name ?? 'Untitled Album'}
					</H5>

					<XStack justify='center' marginVertical={'$2'}>
						<YStack flex={1}>
							{album.ProductionYear ? (
								<Text display='block' textAlign='right'>
									{album.ProductionYear?.toString() ?? 'Unknown Year'}
								</Text>
							) : null}
						</YStack>

						<Separator vertical marginHorizontal={'$3'} />

						<YStack flex={1}>
							<RunTimeTicks>{album.RunTimeTicks}</RunTimeTicks>
						</YStack>
					</XStack>

					<XStack justifyContent='center' marginVertical={'$2'}>
						<FavoriteButton item={album} />

						<Spacer />
						<InstantMixButton item={album} navigation={navigation} />
						<Spacer />
						{/* Download all / Remove all button */}
						{(() => {
							const { downloadedTracks, useDownload, useRemoveDownload } =
								useNetworkContext()
							const allTracks = discs?.flatMap((d) => d.data) ?? []
							const downloadedIds = downloadedTracks?.map((dt) => dt.item.Id) ?? []
							const remaining = allTracks.filter(
								(t) => !downloadedIds.includes(t.Id!),
							)
							const isAllDownloaded = remaining.length === 0 && allTracks.length > 0
							const iconName = isAllDownloaded ? 'delete' : 'download'
							const title = isAllDownloaded ? 'Remove All' : 'Download All'
							const handlePress = () => {
								if (isAllDownloaded) {
									allTracks.forEach((track) => useRemoveDownload.mutate(track))
								} else {
									allTracks.forEach((track) => useDownload.mutate(track))
								}
							}
							return (
								<IconButton
									circular
									name={iconName}
									title={title}
									onPress={handlePress}
									size={getToken('$12') + getToken('$10')}
								/>
							)
						})()}
					</XStack>
				</YStack>
			</XStack>

			<FlatList
				contentContainerStyle={{
					marginTop: getToken('$4'),
				}}
				style={{
					alignSelf: 'center',
				}}
				horizontal
				keyExtractor={(item) => item.Id!}
				data={album.AlbumArtists}
				renderItem={({ item: artist }) => (
					<ItemCard
						size={'$10'}
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
	)
}

function AlbumTrackListFooter(
	album: BaseItemDto,
	navigation: NativeStackNavigationProp<StackParamList>,
): React.JSX.Element {
	return (
		<YStack marginLeft={'$2'}>
			{album.ArtistItems && album.ArtistItems.length > 1 && (
				<>
					<H5>Featuring</H5>

					<FlatList
						data={album.ArtistItems}
						horizontal
						renderItem={({ item: artist }) => (
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
				</>
			)}
		</YStack>
	)
}
