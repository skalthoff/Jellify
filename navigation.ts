import { createNavigationContainerRef } from '@react-navigation/native'
import { RootStackParamList } from './src/screens/types'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()
