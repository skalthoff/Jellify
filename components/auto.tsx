import { useEffect, useState } from 'react'
import CarPlayNavigation from './CarPlay/Navigation'
import { CarPlay } from 'react-native-carplay'
import Client from '../api/client'
import { Platform, View } from 'react-native'
import { isUndefined } from 'lodash'

export default function Auto(): React.JSX.Element {
	const [carPlayConnected, setCarPlayConnected] = useState(CarPlay ? CarPlay.connected : false)

	useEffect(() => {
		function onConnect() {
			setCarPlayConnected(true)

			if (!isUndefined(Client.library)) {
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
