import React from 'react'
import PlayerScreen from '../../components/Player'
import Queue from '../../components/Player/queue'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MultipleArtistsSheet from '../Context/multiple-artists'
import { PlayerParamList } from './types'

export const PlayerStack = createNativeStackNavigator<PlayerParamList>()

export default function Player(): React.JSX.Element {
	return (
		<PlayerStack.Navigator initialRouteName='Player'>
			<PlayerStack.Screen
				name='Player'
				component={PlayerScreen}
				options={{
					headerShown: false,
					headerTitle: '',
				}}
			/>

			<PlayerStack.Screen
				name='Queue'
				component={Queue}
				options={{
					headerTitle: '',
				}}
			/>

			<PlayerStack.Screen
				name='MultipleArtists'
				component={MultipleArtistsSheet}
				options={{
					presentation: 'formSheet',
					sheetAllowedDetents: 'fitToContents',
					sheetGrabberVisible: true,
					headerTitle: 'Artists',
				}}
			/>
		</PlayerStack.Navigator>
	)
}
