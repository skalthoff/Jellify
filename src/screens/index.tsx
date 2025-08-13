import Player from './Player'
import { Tabs } from './tabs'
import { StackParamList } from '../components/types'
import { getToken, useTheme } from 'tamagui'
import { useJellifyContext } from '../providers'
import Login from './Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Context from './Context'
import { Platform } from 'react-native'

const RootStack = createNativeStackNavigator<StackParamList>()

export default function Root(): React.JSX.Element {
	const theme = useTheme()

	const { api, library } = useJellifyContext()

	return (
		<RootStack.Navigator
			initialRouteName={api && library ? 'Tabs' : 'Login'}
			screenOptions={({ route }) => ({
				navigationBarColor:
					route.name === 'Player' ? getToken('$black') : theme.background.val,
			})}
		>
			<RootStack.Screen
				name='Tabs'
				component={Tabs}
				options={{
					headerShown: false,
					navigationBarColor: theme.background.val,
					gestureEnabled: false,
				}}
			/>
			<RootStack.Screen
				name='Player'
				component={Player}
				options={{
					headerShown: false,
					presentation: 'modal',
				}}
			/>
			<RootStack.Screen
				name='Login'
				component={Login}
				options={{
					headerShown: false,
				}}
			/>
			<RootStack.Screen
				name='Context'
				component={Context}
				options={{
					headerShown: false,
					presentation: 'formSheet',
					sheetAllowedDetents: [0.65],
					sheetGrabberVisible: true,
				}}
			/>
		</RootStack.Navigator>
	)
}
