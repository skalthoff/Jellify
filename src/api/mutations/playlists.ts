import { JellifyUser } from '@/src/types/JellifyUser'
import { Api } from '@jellyfin/sdk'
import { BaseItemDto, MediaType } from '@jellyfin/sdk/lib/generated-client/models'
import { getLibraryApi, getPlaylistsApi } from '@jellyfin/sdk/lib/utils/api'

export async function addToPlaylist(
	api: Api | undefined,
	track: BaseItemDto,
	playlist: BaseItemDto,
) {
	console.debug('Adding track to playlist')

	return getPlaylistsApi(api!).addItemToPlaylist({
		ids: [track.Id!],
		playlistId: playlist.Id!,
	})
}

export async function removeFromPlaylist(
	api: Api | undefined,
	track: BaseItemDto,
	playlist: BaseItemDto,
) {
	console.debug('Removing track from playlist')

	return getPlaylistsApi(api!).removeItemFromPlaylist({
		playlistId: playlist.Id!,
		entryIds: [track.Id!],
	})
}

export async function reorderPlaylist(
	api: Api | undefined,
	playlistId: string,
	itemId: string,
	to: number,
) {
	console.debug(`Moving track to index ${to}`)

	return getPlaylistsApi(api!).moveItem({
		playlistId,
		itemId,
		newIndex: to,
	})
}

export async function createPlaylist(
	api: Api | undefined,
	user: JellifyUser | undefined,
	name: string,
) {
	console.debug('Creating new playlist...')

	return getPlaylistsApi(api!).createPlaylist({
		userId: user!.id,
		mediaType: MediaType.Audio,
		createPlaylistDto: {
			Name: name,
			IsPublic: false,
			MediaType: MediaType.Audio,
		},
	})
}

export async function deletePlaylist(api: Api | undefined, playlistId: string) {
	console.debug('Deleting playlist...')

	return getLibraryApi(api!).deleteItem({
		itemId: playlistId,
	})
}

/**
 * Updates a Jellyfin playlist with the provided options.
 *
 * Right now this just supports renaming playlists, but this will change
 * when it comes time for collaborative playlists
 *
 * @param playlistId The Jellyfin ID of the playlist to update
 * @returns
 */
export async function updatePlaylist(
	api: Api | undefined,
	playlistId: string,
	name: string,
	trackIds: string[],
) {
	console.debug('Updating playlist')

	return getPlaylistsApi(api!).updatePlaylist({
		playlistId,
		updatePlaylistDto: {
			Name: name,
			Ids: trackIds,
		},
	})
}
