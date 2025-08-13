import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../types'
import Playlists from '../../Playlists/component'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { usePlaylistsInfiniteQueryContext } from '../../../providers/Library'

export default function PlaylistsTab(): React.JSX.Element {
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

	const playlistsInfiniteQuery = usePlaylistsInfiniteQueryContext()

	return (
		<Playlists
			navigation={navigation}
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
