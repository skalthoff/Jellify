import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import Client from "../../../api/client";
import { getPlaylistsApi } from "@jellyfin/sdk/lib/utils/api";

export async function addToPlaylist(track: BaseItemDto, playlist: BaseItemDto) {
    return getPlaylistsApi(Client.api!)
        .addItemToPlaylist({
            ids: [
                track.Id!
            ],
            playlistId: playlist.Id!
        })
}

export async function reorderPlaylist(playlistId: string, itemId: string, to: number) {
    return getPlaylistsApi(Client.api!)
        .moveItem({
            playlistId, 
            itemId,
            newIndex: to
        });
}