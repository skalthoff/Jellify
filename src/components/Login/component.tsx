import _, { isUndefined } from 'lodash'
import ServerAuthentication from './screens/server-authentication'
import ServerAddress from './screens/server-address'
import { createStackNavigator } from '@react-navigation/stack'
import ServerLibrary from './screens/server-library'
import { useEffect } from 'react'
import { useJellifyContext } from '../provider'

export default function Login(): React.JSX.Element {
	const { user, server, setTriggerAuth } = useJellifyContext()

	const Stack = createStackNavigator()

	useEffect(() => {
		setTriggerAuth(false)
	})

	return (
		<Stack.Navigator
			initialRouteName={
				isUndefined(server)
					? 'ServerAddress'
					: isUndefined(user)
						? 'ServerAuthentication'
						: 'LibrarySelection'
			}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name='ServerAddress'
				options={{
					headerShown: false,
				}}
				component={ServerAddress}
			/>

			<Stack.Screen
				name='ServerAuthentication'
				options={{
					headerShown: false,
				}}
				component={ServerAuthentication}
			/>
			<Stack.Screen
				name='LibrarySelection'
				options={{
					headerShown: false,
				}}
				component={ServerLibrary}
			/>
		</Stack.Navigator>
	)
}
