import NetInfo from '@react-native-community/netinfo'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Platform } from 'react-native'
import { View } from 'tamagui'
import { QueryKeys } from '../../enums/query-keys'
import { Text } from '../Global/helpers/text'

const internetConnectionWatcher = {
	NO_INTERNET: 'You are offline',
	BACK_ONLINE: "And we're back!",
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

	const internetConnectionBack = () => {
		setNetworkStatus(networkStatusTypes.ONLINE)
		setTimeout(() => {
			/* eslint-disable @typescript-eslint/no-unused-expressions */
			lastNetworkStatus.current !== networkStatusTypes.DISCONNECTED && setNetworkStatus(null)
		}, 3000)
	}
	useEffect(() => {
		lastNetworkStatus.current = networkStatus
	}, [networkStatus])

	useEffect(() => {
		if (networkStatus) {
			console.log('networkStatus', networkStatus)
			queryClient.setQueryData([QueryKeys.NetworkStatus], networkStatus)
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

	if (!networkStatus) {
		return null
	}
	return (
		<View>
			<View
				padding={10}
				paddingBottom={isAndroid ? 12 : 15}
				backgroundColor={
					networkStatus === networkStatusTypes.ONLINE ? '$success' : '$danger'
				}
			>
				<Text color={'$purpleDark'} textAlign='center'>
					{networkStatus === networkStatusTypes.ONLINE
						? internetConnectionWatcher.BACK_ONLINE
						: internetConnectionWatcher.NO_INTERNET}
				</Text>
			</View>
		</View>
	)
}

export default InternetConnectionWatcher
