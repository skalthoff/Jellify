import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { NavigatorScreenParams } from '@react-navigation/native'
import LibraryStackParamList from '../Library/types'

type TabParamList = {
	Home: undefined
	Library: NavigatorScreenParams<LibraryStackParamList>
	Search: undefined
	Discover: undefined
	Settings: undefined
}

export type HomeTabProps = BottomTabScreenProps<TabParamList, 'Home'>
export type LibraryTabProps = BottomTabScreenProps<TabParamList, 'Library'>

export default TabParamList
