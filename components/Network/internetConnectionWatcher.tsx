import NetInfo from '@react-native-community/netinfo'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Platform, Text } from 'react-native'
import { View } from 'tamagui'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	runOnJS,
} from 'react-native-reanimated'

import { QueryKeys } from '../../enums/query-keys'

const internetConnectionWatcher = {
	NO_INTERNET: 'No internet connection',
	BACK_ONLINE: 'Back online',
}

export enum networkStatusTypes {
	ONLINE = 'ONLINE',
	DISCONNECTED = 'DISCONNECTED',
}

const isAndroid = Platform.OS === 'android'

const InternetConnectionWatcher = () => {
	const [networkStatus, setNetworkStatus] = useState<keyof typeof networkStatusTypes | null>(null)
	const lastNetworkStatus = useRef<keyof typeof networkStatusTypes | null>()
	const queryClient = useQueryClient()

	const bannerHeight = useSharedValue(0)
	const opacity = useSharedValue(0)

	const animateBannerIn = () => {
		bannerHeight.value = withTiming(40, { duration: 300, easing: Easing.out(Easing.ease) })
		opacity.value = withTiming(1, { duration: 300 })
	}

	const animateBannerOut = () => {
		bannerHeight.value = withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) })
		opacity.value = withTiming(0, { duration: 200 })
	}

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: bannerHeight.value,
			opacity: opacity.value,
		}
	})

	const changeNetworkStatus = () => {
		if (lastNetworkStatus.current !== networkStatusTypes.DISCONNECTED) {
			setNetworkStatus(null)
		}
	}

	const internetConnectionBack = () => {
		setNetworkStatus(networkStatusTypes.ONLINE)
		setTimeout(() => {
			runOnJS(changeNetworkStatus)() // hide text after 3s
		}, 3000)
	}

	useEffect(() => {
		lastNetworkStatus.current = networkStatus
	}, [networkStatus])

	useEffect(() => {
		if (networkStatus) {
			queryClient.setQueryData([QueryKeys.NetworkStatus], networkStatus)
		}

		if (networkStatus === networkStatusTypes.DISCONNECTED) {
			animateBannerIn()
		} else if (networkStatus === networkStatusTypes.ONLINE) {
			animateBannerIn()
			setTimeout(() => {
				animateBannerOut()
			}, 2800)
		} else if (networkStatus === null) {
			animateBannerOut()
		}
	}, [networkStatus])

	useEffect(() => {
		const networkWatcherListener = NetInfo.addEventListener(
			({ isConnected, isInternetReachable }) => {
				const isNetworkDisconnected = !(
					isConnected && (isAndroid ? isInternetReachable : true)
				)

				if (isNetworkDisconnected) {
					setNetworkStatus(networkStatusTypes.DISCONNECTED)
				} else if (
					!isNetworkDisconnected &&
					lastNetworkStatus.current === networkStatusTypes.DISCONNECTED
				) {
					internetConnectionBack()
				}
			},
		)
		return () => {
			networkWatcherListener()
		}
	}, [])

	return (
		<Animated.View style={[{ overflow: 'hidden' }, animatedStyle]}>
			<View
				style={{
					padding: 10,
					paddingBottom: isAndroid ? 12 : 15,
					backgroundColor: networkStatus === networkStatusTypes.ONLINE ? 'green' : 'red',
				}}
			>
				<Text style={{ color: 'white', textAlign: 'center' }}>
					{networkStatus === networkStatusTypes.ONLINE
						? internetConnectionWatcher.BACK_ONLINE
						: internetConnectionWatcher.NO_INTERNET}
				</Text>
			</View>
		</Animated.View>
	)
}

export default InternetConnectionWatcher
