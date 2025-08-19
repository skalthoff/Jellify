import { useJellifyContext } from '../../../providers'
import { useNowPlayingContext, usePlaybackStateContext } from '../../../providers/Player'
import { useQueueRefContext } from '../../../providers/Player/queue'
import { getToken, useWindowDimensions, XStack, YStack, useTheme, Spacer } from 'tamagui'
import { Text } from '../../Global/helpers/text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Icon from '../../Global/components/icon'
import { RootStackParamList } from '../../../screens/types'
import React from 'react'
import { State } from 'react-native-track-player'
import ItemImage from '../../Global/components/image'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { Platform } from 'react-native'

export default function PlayerHeader(): React.JSX.Element {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	const nowPlaying = useNowPlayingContext()
	const playbackState = usePlaybackStateContext()

	const isPlaying = playbackState === State.Playing

	const queueRef = useQueueRefContext()

	const { height } = useSafeAreaFrame()

	const theme = useTheme()

	return (
		<YStack flex={6}>
			<XStack flex={1} justifyContent='center' marginVertical={'$2'}>
				<YStack alignContent='center' flex={1} justifyContent='center'>
					<Icon
						name={Platform.OS === 'ios' ? 'chevron-down' : 'chevron-left'}
						onPress={() => {
							navigation.goBack()
						}}
						small
					/>
				</YStack>

				<YStack alignItems='center' alignContent='center' flex={2}>
					<Text>Playing from</Text>
					<Text bold numberOfLines={1} lineBreakStrategyIOS='standard'>
						{
							// If the Queue is a BaseItemDto, display the name of it
							typeof queueRef === 'object' ? (queueRef.Name ?? 'Untitled') : queueRef
						}
					</Text>
				</YStack>

				<Spacer flex={1} />
			</XStack>

			<XStack justifyContent='center' alignContent='center' paddingVertical={'$8'}>
				<Animated.View
					entering={FadeIn}
					exiting={FadeOut}
					style={{
						height: '100%',
						width: '100%',
					}}
					key={`${nowPlaying!.item.AlbumId}-item-image`}
				>
					<ItemImage item={nowPlaying!.item} testID='player-image-test-id' />
				</Animated.View>
			</XStack>
		</YStack>
	)
}
