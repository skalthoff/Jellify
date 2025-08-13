import { useNavigation } from '@react-navigation/native'
import Artists from '../../Artists/component'
import {
	useArtistPageParamsContext,
	useArtistsInfiniteQueryContext,
} from '../../../providers/Library'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../types'

export default function ArtistsTab(): React.JSX.Element {
	const artistsInfiniteQuery = useArtistsInfiniteQueryContext()
	const artistPageParams = useArtistPageParamsContext()
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

	return (
		<Artists
			artistsInfiniteQuery={artistsInfiniteQuery}
			navigation={navigation}
			showAlphabeticalSelector={true}
			artistPageParams={artistPageParams}
		/>
	)
}
