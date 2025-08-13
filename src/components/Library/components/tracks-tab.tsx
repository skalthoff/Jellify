import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useNavigation } from '@react-navigation/native'
import { StackParamList } from '../../types'
import Tracks from '../../Tracks/component'
import { useTracksInfiniteQueryContext } from '../../../providers/Library'
import { useLibrarySortAndFilterContext } from '../../../providers/Library/sorting-filtering'

export default function TracksTab(): React.JSX.Element {
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

	const tracksInfiniteQuery = useTracksInfiniteQueryContext()

	const { isFavorites, isDownloaded } = useLibrarySortAndFilterContext()

	return (
		<Tracks
			navigation={navigation}
			tracks={tracksInfiniteQuery.data}
			queue={isFavorites ? 'Favorite Tracks' : isDownloaded ? 'Downloaded Tracks' : 'Library'}
			filterDownloaded={isDownloaded}
			filterFavorites={isFavorites}
			fetchNextPage={tracksInfiniteQuery.fetchNextPage}
			hasNextPage={tracksInfiniteQuery.hasNextPage}
		/>
	)
}
