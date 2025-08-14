import { RootStackParamList } from '../../../screens/types'
import Tracks from '../../Tracks/component'
import { useTracksInfiniteQueryContext } from '../../../providers/Library'
import { useLibrarySortAndFilterContext } from '../../../providers/Library/sorting-filtering'

export default function TracksTab(): React.JSX.Element {
	const tracksInfiniteQuery = useTracksInfiniteQueryContext()

	const { isFavorites, isDownloaded } = useLibrarySortAndFilterContext()

	return (
		<Tracks
			tracks={tracksInfiniteQuery.data}
			queue={isFavorites ? 'Favorite Tracks' : isDownloaded ? 'Downloaded Tracks' : 'Library'}
			filterDownloaded={isDownloaded}
			filterFavorites={isFavorites}
			fetchNextPage={tracksInfiniteQuery.fetchNextPage}
			hasNextPage={tracksInfiniteQuery.hasNextPage}
		/>
	)
}
