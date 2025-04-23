import React, { useEffect, useState } from 'react'
import { useProgress } from 'react-native-track-player'
import { HorizontalSlider } from '../../../components/Global/helpers/slider'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { trigger } from 'react-native-haptic-feedback'
import { XStack, YStack } from 'tamagui'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { usePlayerContext } from '../../../player/provider'
import { RunTimeSeconds } from '../../../components/Global/helpers/time-codes'
import { UPDATE_INTERVAL } from '../../../player/config'
import { ProgressMultiplier } from '../component.config'
import Animated, { useSharedValue } from 'react-native-reanimated'

const scrubGesture = Gesture.Pan()

export default function Scrubber(): React.JSX.Element {
	const { useSeekTo, useSkip, usePrevious } = usePlayerContext()

	const { width } = useSafeAreaFrame()

	const [seeking, setSeeking] = useState<boolean>(false)

	const progress = useProgress(UPDATE_INTERVAL)

	const position = useSharedValue<number>(
		progress && progress.position ? Math.floor(progress.position * ProgressMultiplier) : 0,
	)

	/**
	 * Update position in the scrubber if the user isn't interacting
	 */
	useEffect(() => {
		if (
			!seeking &&
			!useSkip.isPending &&
			!usePrevious.isPending &&
			!useSeekTo.isPending &&
			progress.position
		)
			position.value = Math.floor(progress.position * ProgressMultiplier)
	}, [progress.position])

	return (
		<Animated.View>
			<YStack>
				<GestureDetector gesture={scrubGesture}>
					<HorizontalSlider
						value={position.value}
						max={
							progress && progress.duration > 0
								? progress.duration * ProgressMultiplier
								: 1
						}
						width={width / 1.125}
						props={{
							// If user swipes off of the slider we should seek to the spot
							onPressOut: () => {
								trigger('notificationSuccess')
								useSeekTo.mutate(Math.floor(position.value / ProgressMultiplier))
								setSeeking(false)
							},
							onSlideStart: (event, value) => {
								setSeeking(true)
								trigger('impactLight')
							},
							onSlideMove: (event, value) => {
								trigger('clockTick')
								position.value = value
							},
							onSlideEnd: (event, value) => {
								trigger('notificationSuccess')
								position.value = value
								useSeekTo.mutate(Math.floor(value / ProgressMultiplier))
								setSeeking(false)
							},
						}}
					/>
				</GestureDetector>

				<XStack margin={'$2'} marginTop={'$3'}>
					<YStack flex={1} alignItems='flex-start'>
						<RunTimeSeconds>
							{Math.floor(position.value / ProgressMultiplier)}
						</RunTimeSeconds>
					</YStack>

					<YStack flex={1} alignItems='center'>
						{/** Track metadata can go here */}
					</YStack>

					<YStack flex={1} alignItems='flex-end'>
						<RunTimeSeconds>
							{progress && progress.duration ? Math.ceil(progress.duration) : 0}
						</RunTimeSeconds>
					</YStack>
				</XStack>
			</YStack>
		</Animated.View>
	)
}
