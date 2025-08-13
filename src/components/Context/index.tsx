import { BaseItemDto, BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models'
import { useNavigation } from '@react-navigation/native'
import { Separator, View, XStack, YGroup, YStack, ZStack } from 'tamagui'
import { StackParamList } from '../types'
import { Text } from '../Global/helpers/text'
import ItemImage from '../Global/components/image'
import FavoriteContextMenuRow from '../Global/components/favorite-context-menu-row'
import { Blurhash } from 'react-native-blurhash'
import { getPrimaryBlurhashFromDto } from '../../utils/blurhash'

interface ContextProps {
	item: BaseItemDto
}

export default function ItemContext({ item }: ContextProps): React.JSX.Element {
	const navigation = useNavigation<StackParamList>()

	const isArtist = item.Type === BaseItemKind.MusicArtist
	const isAlbum = item.Type === BaseItemKind.MusicAlbum
	const isTrack = item.Type === BaseItemKind.Audio
	const isPlaylist = item.Type === BaseItemKind.Playlist

	return (
		<ZStack flex={1}>
			<View flex={1}>{renderBackgroundBlur(item)}</View>

			<View flex={1}>
				{renderContextHeader(item)}

				<Separator />

				<YGroup>
					<FavoriteContextMenuRow item={item} />
				</YGroup>
			</View>
		</ZStack>
	)
}

function renderBackgroundBlur(item: BaseItemDto): React.JSX.Element {
	const blurhash = getPrimaryBlurhashFromDto(item)

	return (
		<Blurhash
			blurhash={blurhash!}
			style={{
				height: '100%',
				width: '100%',
			}}
		/>
	)
}

function renderContextHeader(item: BaseItemDto): React.JSX.Element {
	const isArtist = item.Type === BaseItemKind.MusicArtist
	const isAlbum = item.Type === BaseItemKind.MusicAlbum
	const isTrack = item.Type === BaseItemKind.Audio
	const isPlaylist = item.Type === BaseItemKind.Playlist

	const itemName = item.Name ?? getNamePlaceholder(item.Type)

	return (
		<XStack alignItems='center' marginBottom={'$2'} margin={'$4'} gap={'$2'} minHeight={'$6'}>
			<ItemImage item={item} circular={isArtist} />

			<YStack gap={'$1'}>
				<Text bold>{itemName}</Text>

				{!isArtist && !isPlaylist ? (
					isAlbum ? (
						<Text>
							{item.AlbumArtists?.map((artist) => artist.Name).join(', ') ||
								'Unknown Artist'}
						</Text>
					) : (
						<Text>
							{item.ArtistItems?.map((artist) => artist.Name).join(', ') ||
								'Unknown Artist'}
						</Text>
					)
				) : (
					<Text>{`${item.ChildCount?.toString() ?? '0'} ${item.ChildCount === 1 ? 'track' : 'tracks'}`}</Text>
				)}
			</YStack>
		</XStack>
	)
}

function getNamePlaceholder(type: BaseItemKind | undefined): string {
	switch (type) {
		case BaseItemKind.MusicArtist:
			return 'Artist'
		case BaseItemKind.MusicAlbum:
			return 'Album'
		case BaseItemKind.Audio:
			return 'Track'
		case BaseItemKind.Playlist:
			return 'Playlist'
		default:
			return 'Item'
	}
}
