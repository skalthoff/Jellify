import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

type TabParamList = {
	Home: undefined
	Library: undefined
	Search: undefined
	Discover: undefined
	Settings: undefined
}

export type HomeTabProps = BottomTabScreenProps<TabParamList, 'Home'>
export type LibraryTabProps = BottomTabScreenProps<TabParamList, 'Library'>

export default TabParamList
