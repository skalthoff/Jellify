import { useState, useEffect, createContext, useContext } from 'react'
import { Platform, View } from 'react-native'
import { CarPlay } from 'react-native-carplay'
import CarPlayNavigation from './Navigation'
import { useAuthenticationContext } from '../Login/provider'
import LoginTemplate from './Login'

interface AutoContext {
	carPlayConnected: boolean
}

const AutoContextInitializer = () => {
	const [carPlayConnected, setCarPlayConnected] = useState(CarPlay ? CarPlay.connected : false)

	const { user } = useAuthenticationContext()

	// Connectedness logging
	useEffect(() => {
		console.debug(`CarPlay${!carPlayConnected && ' not '} connected`)
	})

	useEffect(() => {
		function onConnect() {
			setCarPlayConnected(true)

			if (user) {
				CarPlay.setRootTemplate(CarPlayNavigation(user))

				if (Platform.OS === 'ios') {
					CarPlay.enableNowPlaying(true) // https://github.com/birkir/react-native-carplay/issues/185
				}
			} else {
				CarPlay.setRootTemplate(LoginTemplate)
				CarPlay.popToRootTemplate()
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

	return {
		carPlayConnected,
	}
}

const AutoContext = createContext<AutoContext>({
	carPlayConnected: false,
})

export const AutoProvider: ({ children }: { children: React.ReactNode }) => React.JSX.Element = ({
	children,
}) => {
	const context = AutoContextInitializer()

	return <AutoContext.Provider value={context}>{children}</AutoContext.Provider>
}
