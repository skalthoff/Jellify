import { StackParamList } from '../types'
import { usePlayerContext } from '../../providers/Player'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useCallback, useState, useMemo } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { YStack, XStack, getToken, useTheme, ZStack, useWindowDimensions, View } from 'tamagui'
import Scrubber from './components/scrubber'
import Controls from './components/controls'
import Toast from 'react-native-toast-message'
import JellifyToastConfig from '../../constants/toast.config'
import { useFocusEffect } from '@react-navigation/native'
import Footer from './components/footer'
import BlurredBackground from './components/blurred-background'
import PlayerHeader from './components/header'
import SongInfo from './components/song-info'
import { usePerformanceMonitor } from '../../hooks/use-performance-monitor'

export default function PlayerScreen({
	navigation,
}: {
	navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
	// Monitor performance
	const performanceMetrics = usePerformanceMonitor('PlayerScreen', 5)

	const [showToast, setShowToast] = useState(true)

	const { nowPlaying } = usePlayerContext()

	const theme = useTheme()

	useFocusEffect(
		useCallback(() => {
			setShowToast(true)

			return () => setShowToast(false)
		}, []),
	)

	const { width, height } = useWindowDimensions()

	const { bottom } = useSafeAreaInsets()

	// Memoize expensive calculations
	const songInfoContainerStyle = useMemo(
		() => ({
			justifyContent: 'center' as const,
			alignItems: 'center' as const,
			marginHorizontal: 'auto' as const,
			width: getToken('$20') + getToken('$20') + getToken('$5'),
			maxWidth: width / 1.1,
			flex: 2,
		}),
		[width],
	)

	const scrubberContainerStyle = useMemo(
		() => ({
			justifyContent: 'center' as const,
			flex: 1,
		}),
		[],
	)

	const mainContainerStyle = useMemo(
		() => ({
			flex: 1,
			marginBottom: bottom,
		}),
		[bottom],
	)

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View flex={1}>
				{nowPlaying && (
					<ZStack fullscreen>
						<BlurredBackground width={width} height={height} />

						<YStack flex={1} marginBottom={bottom} style={mainContainerStyle}>
							<PlayerHeader navigation={navigation} />

							<XStack style={songInfoContainerStyle}>
								<SongInfo navigation={navigation} />
							</XStack>

							<XStack style={scrubberContainerStyle}>
								{/* playback progress goes here */}
								<Scrubber />
							</XStack>

							<Controls />

							<Footer navigation={navigation} />
						</YStack>
					</ZStack>
				)}
				{showToast && <Toast config={JellifyToastConfig(theme)} />}
			</View>
		</SafeAreaView>
	)
}
