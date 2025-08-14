import { XStack } from 'tamagui'

import Icon from '../../Global/components/icon'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../screens/types'
import { useNavigation } from '@react-navigation/native'

export default function Footer(): React.JSX.Element {
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

	return (
		<XStack justifyContent='flex-end' alignItems='center' marginHorizontal={'$5'} flex={1}>
			<XStack alignItems='center' justifyContent='flex-start' flex={1}>
				<Icon small name='cast-audio' disabled />
			</XStack>

			<XStack alignItems='center' justifyContent='flex-end' flex={1}>
				<Icon
					small
					testID='queue-button-test-id'
					name='playlist-music'
					onPress={() => {
						navigation.navigate('Queue')
					}}
				/>
			</XStack>
		</XStack>
	)
}
