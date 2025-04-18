import { usePlayerContext } from '../../../player/provider'
import React from 'react'
import { getToken, getTokens, Spacer, Theme, useTheme, View, XStack, YStack } from 'tamagui'
import { Text } from '../helpers/text'
import { RunTimeTicks } from '../helpers/time-codes'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import Icon from '../helpers/icon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../../components/types'
import { QueuingType } from '../../../enums/queuing-type'
import { Queue } from '../../../player/types/queue-item'
import FavoriteIcon from './favorite-icon'
import { Image } from 'expo-image'
import { getImageApi } from '@jellyfin/sdk/lib/utils/api'
import Client from '../../../api/client'

interface TrackProps {
	track: BaseItemDto
	navigation: NativeStackNavigationProp<StackParamList>
	tracklist?: BaseItemDto[] | undefined
	index?: number | undefined
	queue: Queue
	showArtwork?: boolean | undefined
	onPress?: () => void | undefined
	onLongPress?: () => void | undefined
	isNested?: boolean | undefined
	invertedColors?: boolean | undefined
	onDragStart?: () => void | undefined
	onDragEnd?: () => void | undefined
	showRemove?: boolean | undefined
	onRemove?: () => void | undefined
}

export default function Track({
	track,
	tracklist,
	navigation,
	index,
	queue,
	showArtwork,
	onPress,
	onLongPress,
	onDragStart,
	onDragEnd,
	isNested,
	invertedColors,
	showRemove,
	onRemove,
}: TrackProps): React.JSX.Element {
	const theme = useTheme()
	const { nowPlaying, playQueue, usePlayNewQueue } = usePlayerContext()

	const isPlaying = nowPlaying?.item.Id === track.Id

	return (
		<Theme name={invertedColors ? 'inverted_purple' : undefined}>
			<XStack alignContent='center' alignItems='center' flex={1} paddingVertical={'$2'}>
				{onDragStart && onDragEnd && (
					<YStack
						alignContent='center'
						justifyContent='center'
						flex={1}
						onPressIn={onDragStart}
						onPressOut={onDragEnd}
					>
						{<Icon name='drag' />}
					</YStack>
				)}

				<View
					flexDirection='row'
					flex={9}
					onPress={() => {
						if (onPress) {
							onPress()
						} else {
							usePlayNewQueue.mutate({
								track,
								index,
								tracklist: tracklist ?? playQueue.map((track) => track.item),
								queue,
								queuingType: QueuingType.FromSelection,
							})
						}
					}}
					onLongPress={
						onLongPress
							? () => onLongPress()
							: () => {
									navigation.navigate('Details', {
										item: track,
										isNested: isNested,
									})
							  }
					}
				>
					<XStack
						alignContent='center'
						justifyContent='center'
						flex={showArtwork ? 2 : 1}
						marginHorizontal={'$2'}
						minHeight={showArtwork ? '$4' : 'unset'}
					>
						{showArtwork ? (
							<Image
								source={getImageApi(Client.api!).getItemImageUrlById(
									track.AlbumId!,
								)}
								style={{
									width: getToken('$12'),
									height: getToken('$12'),
									borderRadius: getToken('$1'),
								}}
							/>
						) : (
							<Text color={isPlaying ? getTokens().color.telemagenta : theme.color}>
								{track.IndexNumber?.toString() ?? ''}
							</Text>
						)}
					</XStack>

					<YStack alignContent='center' justifyContent='flex-start' flex={6}>
						<Text
							bold
							color={isPlaying ? getTokens().color.telemagenta : theme.color}
							lineBreakStrategyIOS='standard'
							numberOfLines={1}
						>
							{track.Name ?? 'Untitled Track'}
						</Text>

						{(showArtwork || (track.ArtistCount ?? 0 > 1)) && (
							<Text lineBreakStrategyIOS='standard' numberOfLines={1}>
								{track.Artists?.join(', ') ?? ''}
							</Text>
						)}
					</YStack>

					<XStack
						alignItems='center'
						justifyContent='space-between'
						alignContent='center'
						flex={4}
					>
						<FavoriteIcon item={track} />

						<YStack alignContent='center' justifyContent='space-around'>
							<RunTimeTicks>{track.RunTimeTicks}</RunTimeTicks>
						</YStack>

						<YStack
							alignContent='center'
							justifyContent='flex-start'
							marginRight={'$3'}
						>
							<Icon
								name={showRemove ? 'close' : 'dots-horizontal'}
								onPress={() => {
									if (showRemove) {
										if (onRemove) onRemove()
									} else {
										navigation.navigate('Details', {
											item: track,
											isNested: isNested,
										})
									}
								}}
							/>
						</YStack>
					</XStack>
				</View>
			</XStack>
		</Theme>
	)
}
