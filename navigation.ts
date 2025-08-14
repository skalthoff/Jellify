import { createNavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList } from './src/screens/types'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export default function navigate(
	name: keyof RootStackParamList,
	params?: RootStackParamList[keyof RootStackParamList],
) {
	if (navigationRef.isReady()) navigationRef.navigate(name, params)
}
