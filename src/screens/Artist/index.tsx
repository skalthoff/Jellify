import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BaseStackParamList } from '../types'
import { ArtistProvider } from '../../providers/Artist'
import ArtistNavigation from '../../components/Artist'

export function ArtistScreen({
	route,
	navigation,
}: {
	route: RouteProp<BaseStackParamList, 'Artist'>
	navigation: NativeStackNavigationProp<BaseStackParamList, 'Artist'>
}): React.JSX.Element {
	const { artist } = route.params

	return (
		<ArtistProvider artist={artist}>
			<ArtistNavigation />
		</ArtistProvider>
	)
}
