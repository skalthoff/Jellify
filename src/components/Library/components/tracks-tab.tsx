import { BaseStackParamList, RootStackParamList } from '../../../screens/types'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useNavigation } from '@react-navigation/native'
import Tracks from '../../Tracks/component'
import { useTracksInfiniteQueryContext } from '../../../providers/Library'
import { useLibrarySortAndFilterContext } from '../../../providers/Library/sorting-filtering'

function TracksTab(): React.JSX.Element {
	const tracksInfiniteQuery = useTracksInfiniteQueryContext()
	const navigation = useNavigation<NativeStackNavigationProp<BaseStackParamList>>()

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

export default TracksTab
