import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BaseStackParamList } from '../types'

type LibraryStackParamList = BaseStackParamList & {
	AddPlaylist: undefined

	DeletePlaylist: {
		playlist: BaseItemDto
	}
}

export default LibraryStackParamList

export type LibraryScreenProps = NativeStackScreenProps<LibraryStackParamList, 'Library'>
export type LibraryArtistProps = NativeStackScreenProps<LibraryStackParamList, 'Artist'>
export type LibraryAlbumProps = NativeStackScreenProps<LibraryStackParamList, 'Album'>

export type LibraryAddPlaylistProps = NativeStackScreenProps<LibraryStackParamList, 'AddPlaylist'>
export type LibraryDeletePlaylistProps = NativeStackScreenProps<
	LibraryStackParamList,
	'DeletePlaylist'
>

type LibraryNavigation = {
	album?: BaseItemDto
	artist?: BaseItemDto
	playlist?: BaseItemDto
}

export const LibraryNavigation: LibraryNavigation = {}
