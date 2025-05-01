import { HomeAlbumProps, StackParamList } from '../types'
import { YStack, XStack, Separator, getToken, Spacer } from 'tamagui'
import { H5, Text } from '../Global/helpers/text'
import { FlatList, SectionList } from 'react-native'
import { RunTimeTicks } from '../Global/helpers/time-codes'
import Track from '../Global/components/track'
import FavoriteButton from '../Global/components/favorite-button'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { getImageApi } from '@jellyfin/sdk/lib/utils/api'
import Client from '../../api/client'
import { ItemCard } from '../Global/components/item-card'
import { fetchAlbumDiscs } from '../../api/queries/item'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InstantMixButton from '../Global/components/instant-mix-button'
import FastImage from 'react-native-fast-image'

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

	const { data: discs } = useQuery({
		queryKey: [QueryKeys.ItemTracks, album.Id!],
		queryFn: () => fetchAlbumDiscs(album),
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
			ListHeaderComponent={() => AlbumTrackListHeader(album, navigation)}
			renderItem={({ item: track, index }) => (
				<Track
					track={track}
					tracklist={discs?.flatMap((disc) => disc.data)}
					index={discs?.flatMap((disc) => disc.data).indexOf(track) ?? index}
					navigation={navigation}
					queue={album}
				/>
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
): React.JSX.Element {
	return (
		<YStack marginTop={'$2'} minHeight={getToken('$20') + getToken('$15')}>
			<FastImage
				source={{ uri: getImageApi(Client.api!).getItemImageUrlById(album.Id!) }}
				style={{
					borderRadius: getToken('$5'),
					width: getToken('$20') + getToken('$15'),
					height: getToken('$20') + getToken('$15'),
					alignSelf: 'center',
				}}
			/>

			<H5 textAlign='center'>{album.Name ?? 'Untitled Album'}</H5>

			<FlatList
				contentContainerStyle={{
					marginLeft: 2,
					marginTop: 2,
				}}
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

			<XStack justify='center' marginVertical={'$2'}>
				<YStack flex={1}>
					{album.ProductionYear ? (
						<Text
							display='block'
							textAlign='right'
						>{`Released ${album.ProductionYear?.toString()}`}</Text>
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
			</XStack>
		</YStack>
	)
}
