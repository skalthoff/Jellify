import { StackParamList } from '../../../components/types'
import { usePlayerContext } from '../../../player/provider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useMemo, useState } from 'react'
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context'
import { YStack, XStack, Spacer, getTokens } from 'tamagui'
import { Text } from '../../../components/Global/helpers/text'
import Icon from '../../../components/Global/helpers/icon'
import FavoriteButton from '../../Global/components/favorite-button'
import TextTicker from 'react-native-text-ticker'
import { TextTickerConfig } from '../component.config'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import Scrubber from '../helpers/scrubber'
import Controls from '../helpers/controls'
import { Image } from 'expo-image'
import { getImageApi } from '@jellyfin/sdk/lib/utils/api'
import Client from '../../../api/client'
import { saveAudio, getAudioCache } from '../../../components/Network/offlineModeUtils'
import { useActiveTrack } from 'react-native-track-player'
import { Alert } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'

export default function PlayerScreen({
	navigation,
}: {
	navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
	const { nowPlayingIsFavorite, setNowPlayingIsFavorite, nowPlaying, queue } = usePlayerContext()

	const [isDownloading, setIsDownloading] = useState(false)

	const activeTrack = useActiveTrack()
	const queryClient = useQueryClient()

	const { width } = useSafeAreaFrame()
	
	const downloadAudio = async (url: string) => {
		if(!nowPlaying){
			return;
		}
		setIsDownloading(true)
		await saveAudio(nowPlaying,queryClient)
		setIsDownloading(false)
		Alert.alert("Downloaded")
	}

	console.log("activeTrack", activeTrack)
	return (
		<SafeAreaView edges={['right', 'left']}>
			{nowPlaying && (
				<>
					<YStack>
						{useMemo(() => {
							return (
								<>
									<XStack marginBottom={'$2'} marginHorizontal={'$2'}>
										<YStack
											alignContent='flex-end'
											flex={1}
											justifyContent='center'
										>
											<Icon
												name='chevron-down'
												onPress={() => {
													navigation.goBack()
												}}
												small
											/>
										</YStack>

										<YStack alignItems='center' alignContent='center' flex={6}>
											<Text>Playing from</Text>
											<Text
												bold
												numberOfLines={1}
												lineBreakStrategyIOS='standard'
											>
												{
													// If the Queue is a BaseItemDto, display the name of it
													typeof queue === 'object'
														? (queue as BaseItemDto).Name ?? 'Untitled'
														: queue
												}
											</Text>
										</YStack>

										<Spacer flex={1} />
									</XStack>

									<XStack
										justifyContent='center'
										alignContent='center'
										minHeight={width / 1.1}
									>
										<Image
											source={getImageApi(Client.api!).getItemImageUrlById(
												nowPlaying!.item.AlbumId!,
											)}
											placeholder={
												nowPlaying &&
												nowPlaying.item.ImageBlurHashes &&
												nowPlaying.item.ImageBlurHashes.Primary
													? nowPlaying.item.ImageBlurHashes.Primary[0]
													: undefined
											}
											style={{
												borderRadius: 2,
												width: width / 1.1,
											}}
										/>
									</XStack>
								</>
							)
						}, [nowPlaying, queue])}

						<XStack marginHorizontal={20} paddingVertical={5}>
							{/** Memoize TextTickers otherwise they won't animate due to the progress being updated in the PlayerContext */}
							{useMemo(() => {
								return (
									<YStack justifyContent='flex-start' flex={5}>
										<TextTicker {...TextTickerConfig}>
											<Text bold fontSize={'$6'}>
												{nowPlaying!.title ?? 'Untitled Track'}
											</Text>
										</TextTicker>

										<TextTicker {...TextTickerConfig}>
											<Text
												fontSize={'$6'}
												color={getTokens().color.telemagenta}
												onPress={() => {
													if (nowPlaying!.item.ArtistItems) {
														navigation.goBack() // Dismiss player modal
														navigation.navigate('Tabs', {
															screen: 'Home',
															params: {
																screen: 'Artist',
																params: {
																	artist: nowPlaying!.item
																		.ArtistItems![0],
																},
															},
														})
													}
												}}
											>
												{nowPlaying.artist ?? 'Unknown Artist'}
											</Text>
										</TextTicker>

										<TextTicker {...TextTickerConfig}>
											<Text fontSize={'$6'} color={'$borderColor'}>
												{nowPlaying!.album ?? ''}
											</Text>
										</TextTicker>
									</YStack>
								)
							}, [nowPlaying])}

							<XStack justifyContent='flex-end' alignItems='center' flex={2}>
								{/* Buttons for favorites, song menu go here */}

								<Icon
									name='dots-horizontal-circle-outline'
									onPress={() => {
										navigation.navigate('Details', {
											item: nowPlaying!.item,
											isNested: true,
										})
									}}
								/>

								<Spacer />

								<FavoriteButton
									item={nowPlaying!.item}
									onToggle={() => setNowPlayingIsFavorite(!nowPlayingIsFavorite)}
								/>
							</XStack>
						</XStack>

						<XStack justifyContent='center' marginTop={'$3'}>
							{/* playback progress goes here */}
							<Scrubber />
						</XStack>

						<Controls />

						<XStack justifyContent='space-evenly' marginVertical={'$7'}>
							<Icon name='speaker-multiple' />

							<Spacer />
							<Icon name={isDownloading ? 'download' : 'download-outline'} onPress={() => {
								downloadAudio(nowPlaying!.url)
							}} />

							<Spacer />

							<Icon
								name='playlist-music'
								onPress={() => {
									navigation.navigate('Queue')
								}}
							/>
						</XStack>
					</YStack>
				</>
			)}
		</SafeAreaView>
	)
}
