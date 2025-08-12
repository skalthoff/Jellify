import { BaseItemDto, BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models'
import { useNavigation } from '@react-navigation/native'
import { ListItem, Separator, View, XStack, YGroup, YStack } from 'tamagui'
import { StackParamList } from '../types'
import { Text } from '../Global/helpers/text'
import ItemImage from '../Global/components/image'
import Button from '../Global/helpers/button'
import Icon from '../Global/components/icon'

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
		<View flex={1} margin={'$2'}>
			{renderContextHeader(item)}

			<YGroup separator={<Separator />}>
				<YGroup.Item>
					<ListItem>
						<Button>
							<Icon name='heart-outline' small color={'$borderColor'} />
						</Button>
					</ListItem>
				</YGroup.Item>
			</YGroup>
		</View>
	)
}

function renderContextHeader(item: BaseItemDto): React.JSX.Element {
	const isArtist = item.Type === BaseItemKind.MusicArtist
	const isAlbum = item.Type === BaseItemKind.MusicAlbum
	const isTrack = item.Type === BaseItemKind.Audio
	const isPlaylist = item.Type === BaseItemKind.Playlist

	const itemName = item.Name ?? getNamePlaceholder(item.Type)

	return (
		<XStack alignItems='center' marginTop={'$2'} gap={'$2'}>
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
