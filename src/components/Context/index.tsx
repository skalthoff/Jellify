import { BaseItemDto, BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models'
import { getToken, ListItem, YGroup, ZStack } from 'tamagui'
import { RootStackParamList } from '../../screens/types'
import { Text } from '../Global/helpers/text'
import FavoriteContextMenuRow from '../Global/components/favorite-context-menu-row'
import { Blurhash } from 'react-native-blurhash'
import { getPrimaryBlurhashFromDto } from '../../utils/blurhash'
import { InteractionManager, useColorScheme } from 'react-native'
import { useThemeSettingContext } from '../../providers/Settings'
import LinearGradient from 'react-native-linear-gradient'
import Icon from '../Global/components/icon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { fetchItem } from '../../api/queries/item'
import { useJellifyContext } from '../../providers'
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api'
import { useAddToQueueContext } from '../../providers/Player/queue'
import { AddToQueueMutation } from '../../providers/Player/interfaces'
import { QueuingType } from '../../enums/queuing-type'
import LibraryStackParamList from '../../screens/Library/types'
import DiscoverStackParamList from '../../screens/Discover/types'
import HomeStackParamList from '../../screens/Home/types'
import { useCallback } from 'react'
import { StackActions, TabActions } from '@react-navigation/native'
import navigationRef from '../../../navigation'
import { goToAlbumFromContextSheet, goToArtistFromContextSheet } from './utils/navigation'

interface ContextProps {
	item: BaseItemDto
	stackNavigation?: NativeStackNavigationProp<
		HomeStackParamList | LibraryStackParamList | DiscoverStackParamList
	>
	navigation: NativeStackNavigationProp<RootStackParamList>
	navigationCallback?: (screen: 'Album' | 'Artist', item: BaseItemDto) => void
}

export default function ItemContext({ item, stackNavigation }: ContextProps): React.JSX.Element {
	const { api } = useJellifyContext()

	const isArtist = item.Type === BaseItemKind.MusicArtist
	const isAlbum = item.Type === BaseItemKind.MusicAlbum
	const isTrack = item.Type === BaseItemKind.Audio
	const isPlaylist = item.Type === BaseItemKind.Playlist

	const albumArtists = item.AlbumArtists ?? []

	const { data: album } = useQuery({
		queryKey: [QueryKeys.Item, item.AlbumId],
		queryFn: () => fetchItem(api, item.AlbumId!),
		enabled: isTrack,
	})

	const { data: artist } = useQuery({
		queryKey: [QueryKeys.ArtistById, albumArtists.length > 0 ? albumArtists[0].Id : item.Id],
		queryFn: () => fetchItem(api, albumArtists[0].Id!),
		enabled: (isTrack || isAlbum) && albumArtists.length > 0,
	})

	const { data: tracks } = useQuery({
		queryKey: [QueryKeys.ItemTracks, item.Id],
		queryFn: () =>
			getItemsApi(api!)
				.getItems({ parentId: item.Id! })
				.then(({ data }) => {
					if (data.Items) return data.Items
					else return []
				}),
	})

	const renderAddToQueueRow = isTrack || isAlbum || isPlaylist

	return (
		<ZStack>
			<ItemContextBackground item={item} />

			<YGroup unstyled flex={1} marginTop={'$8'}>
				<FavoriteContextMenuRow item={item} />

				{renderAddToQueueRow && tracks && (
					<AddToQueueMenuRow tracks={isTrack ? [item] : tracks} />
				)}

				{(!isArtist || !isPlaylist) && (
					<ViewAlbumMenuRow
						item={isAlbum ? item : album!}
						stackNavigation={stackNavigation}
					/>
				)}

				{!isPlaylist && (
					<ViewArtistMenuRow
						item={isArtist ? item : artist}
						stackNavigation={stackNavigation}
					/>
				)}
			</YGroup>
		</ZStack>
	)
}

function ItemContextBackground({ item }: { item: BaseItemDto }): React.JSX.Element {
	return (
		<ZStack flex={1}>
			<BackgroundBlur item={item} />

			<BackgroundGradient />
		</ZStack>
	)
}

function BackgroundBlur({ item }: { item: BaseItemDto }): React.JSX.Element {
	const blurhash = getPrimaryBlurhashFromDto(item)

	return (
		<Blurhash
			blurhash={blurhash!}
			style={{
				flex: 1,
			}}
		/>
	)
}

function AddToQueueMenuRow({ tracks }: { tracks: BaseItemDto[] }): React.JSX.Element {
	const useAddToQueue = useAddToQueueContext()

	const mutation: AddToQueueMutation = {
		tracks,
		queuingType: QueuingType.DirectlyQueued,
	}

	return (
		<ListItem
			animation={'quick'}
			backgroundColor={'transparent'}
			flex={1}
			gap={'$2'}
			justifyContent='flex-start'
			onPress={() => {
				useAddToQueue.mutate(mutation)
			}}
			pressStyle={{ opacity: 0.5 }}
		>
			<Icon color='$primary' name='playlist-plus' />

			<Text bold>Add to Queue</Text>
		</ListItem>
	)
}

function BackgroundGradient(): React.JSX.Element {
	const themeSetting = useThemeSettingContext()

	const colorScheme = useColorScheme()

	const isDarkMode =
		(themeSetting === 'system' && colorScheme === 'dark') || themeSetting === 'dark'

	const gradientColors = isDarkMode
		? [getToken('$black'), getToken('$black75')]
		: [getToken('$lightTranslucent'), getToken('$lightTranslucent')]

	return <LinearGradient style={{ flex: 1 }} colors={gradientColors} />
}

interface MenuRowProps {
	item: BaseItemDto | undefined
	stackNavigation?: NativeStackNavigationProp<
		HomeStackParamList | LibraryStackParamList | DiscoverStackParamList
	>
}

function ViewAlbumMenuRow({ item: album, stackNavigation }: MenuRowProps): React.JSX.Element {
	const goToAlbum = useCallback(() => {
		if (stackNavigation && album) stackNavigation.navigate('Album', { album })
		else goToAlbumFromContextSheet(album)
	}, [album, stackNavigation, navigationRef])

	return (
		<ListItem
			animation='quick'
			backgroundColor={'transparent'}
			gap={'$2'}
			justifyContent='flex-start'
			onPress={goToAlbum}
			pressStyle={{ opacity: 0.5 }}
		>
			<Icon color='$primary' name='disc' />

			<Text bold>Go to Album</Text>
		</ListItem>
	)
}

function ViewArtistMenuRow({ item: artist, stackNavigation }: MenuRowProps): React.JSX.Element {
	const goToArtist = useCallback(() => {
		if (stackNavigation && artist) stackNavigation.navigate('Artist', { artist })
		else goToArtistFromContextSheet(artist)
	}, [artist, stackNavigation, navigationRef])

	return (
		<ListItem
			animation={'quick'}
			backgroundColor={'transparent'}
			gap={'$2'}
			justifyContent='flex-start'
			onPress={goToArtist}
			pressStyle={{ opacity: 0.5 }}
		>
			<Icon color='$primary' name='microphone-variant' />

			<Text bold>Go to Artist</Text>
		</ListItem>
	)
}
