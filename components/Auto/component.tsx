import Client from '@/api/client'
import { useState, useEffect } from 'react'
import { Platform, View } from 'react-native'
import { CarPlay } from 'react-native-carplay'
import CarPlayNavigation from './Navigation'
import { useAuthenticationContext } from '../Login/provider'

export default function Auto(): React.JSX.Element {
	const [carPlayConnected, setCarPlayConnected] = useState(CarPlay ? CarPlay.connected : false)

	const { user } = useAuthenticationContext()

	useEffect(() => {
		function onConnect() {
			setCarPlayConnected(true)

			if (user) {
				CarPlay.setRootTemplate(CarPlayNavigation)

				if (Platform.OS === 'ios') {
					CarPlay.enableNowPlaying(true) // https://github.com/birkir/react-native-carplay/issues/185
				}
			}
		}

		function onDisconnect() {
			setCarPlayConnected(false)
		}

		CarPlay.registerOnConnect(onConnect)
		CarPlay.registerOnDisconnect(onDisconnect)
		return () => {
			CarPlay.unregisterOnConnect(onConnect)
			CarPlay.unregisterOnDisconnect(onDisconnect)
		}
	})

	return <View />
}
