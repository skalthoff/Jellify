import TextTicker from 'react-native-text-ticker'
import { getToken, XStack, YStack } from 'tamagui'
import { TextTickerConfig } from '../component.config'
import { useNowPlayingContext } from '../../../providers/Player'
import { Text } from '../../Global/helpers/text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../screens/types'
import React, { useMemo } from 'react'
import ItemImage from '../../Global/components/image'
import { useQuery } from '@tanstack/react-query'
import { fetchItem, fetchItems } from '../../../api/queries/item'
import { useJellifyContext } from '../../../providers'
import FavoriteButton from '../../Global/components/favorite-button'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Icon from '../../Global/components/icon'
import { useNavigation } from '@react-navigation/native'
import { QueryKeys } from '../../../enums/query-keys'
import { BaseItemDto, BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models'
import { PlayerParamList } from '../../../screens/Player/types'

export default function SongInfo(): React.JSX.Element {
	const { api, user, library } = useJellifyContext()
	const nowPlaying = useNowPlayingContext()

	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	const { data: album } = useQuery({
		queryKey: [QueryKeys.Album, nowPlaying!.item.AlbumId],
		queryFn: () => fetchItem(api, nowPlaying!.item.AlbumId!),
	})

	useQuery({
		queryKey: [QueryKeys.TrackArtists, nowPlaying!.item.ArtistItems],
		queryFn: () => fetchItems(api, user, library, [BaseItemKind.MusicArtist]),
		select: (data: { title: string | number; data: BaseItemDto[] }) => data.data,
	})

	return useMemo(() => {
		return (
			<XStack flex={1}>
				<YStack
					marginHorizontal={'$1.5'}
					onPress={() => {
						if (album) {
							navigation.popTo('Tabs', {
								screen: 'LibraryTab',
								params: {
									screen: 'Album',
									params: {
										album,
									},
								},
							})
						}
					}}
					justifyContent='center'
				>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						key={`${nowPlaying!.item.AlbumId}-album-image`}
					>
						<ItemImage item={nowPlaying!.item} width={'$11'} height={'$11'} />
					</Animated.View>
				</YStack>

				<YStack justifyContent='flex-start' flex={1} gap={'$0.25'}>
					<Animated.View
						entering={FadeIn}
						exiting={FadeOut}
						key={`${nowPlaying!.item.AlbumId}-song-info`}
					>
						<TextTicker {...TextTickerConfig} style={{ height: getToken('$9') }}>
							<Text bold fontSize={'$6'}>
								{nowPlaying!.title ?? 'Untitled Track'}
							</Text>
						</TextTicker>

						<TextTicker {...TextTickerConfig} style={{ height: getToken('$8') }}>
							<Text
								fontSize={'$6'}
								color={'$color'}
								onPress={() => {
									if (nowPlaying!.item.ArtistItems) {
										if (nowPlaying!.item.ArtistItems!.length > 1) {
											navigation.navigate('PlayerRoot', {
												screen: 'MultipleArtistsSheet',
												params: {
													artists: nowPlaying!.item.ArtistItems!,
												},
											})
										} else {
											navigation.popTo('Tabs', {
												screen: 'LibraryTab',
												params: {
													screen: 'Artist',
													params: {
														artist: nowPlaying!.item.ArtistItems[0],
													},
												},
											})
										}
									}
								}}
							>
								{nowPlaying?.artist ?? 'Unknown Artist'}
							</Text>
						</TextTicker>
					</Animated.View>
				</YStack>

				<XStack gap={'$3'} justifyContent='flex-end' alignItems='center' flexShrink={1}>
					<Icon
						name='dots-horizontal-circle-outline'
						onPress={() => {
							navigation.navigate('Context', {
								item: nowPlaying!.item,
							})
						}}
					/>
					<FavoriteButton item={nowPlaying!.item} />
				</XStack>
			</XStack>
		)
	}, [nowPlaying, album])
}
