import Playlists from '../../Playlists/component'
import React from 'react'
import { usePlaylistsInfiniteQueryContext } from '../../../providers/Library'

export default function PlaylistsTab(): React.JSX.Element {
	const playlistsInfiniteQuery = usePlaylistsInfiniteQueryContext()

	return (
		<Playlists
			playlists={playlistsInfiniteQuery.data}
			refetch={playlistsInfiniteQuery.refetch}
			fetchNextPage={playlistsInfiniteQuery.fetchNextPage}
			hasNextPage={playlistsInfiniteQuery.hasNextPage}
			isPending={playlistsInfiniteQuery.isPending}
			isFetchingNextPage={playlistsInfiniteQuery.isFetchingNextPage}
			canEdit
		/>
	)
}
