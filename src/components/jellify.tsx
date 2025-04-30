import _ from 'lodash'
import React, { useEffect } from 'react'
import Navigation from './navigation'
import Login from './Login/component'
import { JellyfinAuthenticationProvider } from './Login/provider'
import { PlayerProvider } from '../player/player-provider'
import { useColorScheme } from 'react-native'
import { PortalProvider } from '@tamagui/portal'
import { JellifyProvider, useJellifyContext } from './provider'
import { ToastProvider } from '@tamagui/toast'
import { JellifyUserDataProvider } from './user-data-provider'
import { NetworkContextProvider } from './Network/provider'
import { QueueProvider } from '../player/queue-provider'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AutoProvider } from './Auto/provider'

export default function Jellify(): React.JSX.Element {
	const insets = useSafeAreaInsets()

	useEffect(() => {
		console.debug(insets)
	}, [insets])

	return (
		<PortalProvider shouldAddRootHost>
			<ToastProvider burntOptions={{ from: 'top' }}>
				<JellifyProvider>
					<App />
				</JellifyProvider>
			</ToastProvider>
		</PortalProvider>
	)
}

function App(): React.JSX.Element {
	const { loggedIn } = useJellifyContext()

	return (
		<JellyfinAuthenticationProvider>
			<AutoProvider>
				{loggedIn ? (
					<JellifyUserDataProvider>
						<NetworkContextProvider>
							<QueueProvider>
								<PlayerProvider>
									<Navigation />
								</PlayerProvider>
							</QueueProvider>
						</NetworkContextProvider>
					</JellifyUserDataProvider>
				) : (
					<Login />
				)}
			</AutoProvider>
		</JellyfinAuthenticationProvider>
	)
}
