import React from 'react'
import Button from '../../Global/helpers/button'
import { useJellifyContext } from '../../../components/provider'
import TrackPlayer from 'react-native-track-player'
import { StackParamList } from '../../../components/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

export default function SignOut(): React.JSX.Element {
	const { signOut } = useJellifyContext()
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

	return (
		<Button
			onPress={() => {
				TrackPlayer.reset()
					.then(() => {
						console.debug('TrackPlayer cleared')
					})
					.catch((error) => {
						console.error('Error clearing TrackPlayer', error)
					})
					.finally(() => {
						signOut()
						navigation.navigate('ServerAddress', undefined, {
							pop: true,
						})
					})
			}}
		>
			Sign Out
		</Button>
	)
}
