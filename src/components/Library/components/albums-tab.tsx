import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Albums from '../../Albums/component'
import { StackParamList } from '../../types'
import { useAlbumsInfiniteQueryContext } from '../../../providers/Library'
import { useNavigation } from '@react-navigation/native'

export default function AlbumsTab(): React.JSX.Element {
	const albumsInfiniteQuery = useAlbumsInfiniteQueryContext()

	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

	return (
		<Albums
			albums={albumsInfiniteQuery.data}
			navigation={navigation}
			fetchNextPage={albumsInfiniteQuery.fetchNextPage}
			hasNextPage={albumsInfiniteQuery.hasNextPage}
			isPending={albumsInfiniteQuery.isPending}
			isFetchingNextPage={albumsInfiniteQuery.isFetchingNextPage}
			showAlphabeticalSelector={true}
		/>
	)
}
