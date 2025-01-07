import { Api } from "@jellyfin/sdk";
import { BaseItemDto, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";

export function fetchUserPlaylists(api: Api, userId: string, playlistLibraryId: string): Promise<BaseItemDto[]> {
    console.debug("Fetching user playlists");

    return new Promise(async (resolve, reject) => {
        getItemsApi(api)
            .getItems({
                userId: userId,
                parentId: playlistLibraryId,
                sortBy: [
                    ItemSortBy.IsFolder,
                    ItemSortBy.SortName
                ],
                sortOrder: [
                    SortOrder.Ascending
                ]
            })
            .then((response) => {
                if (response.data.Items)
                    resolve(response.data.Items)
                else 
                    resolve([]);
            })
            .catch((error) => {
                console.error(error);
                reject(error)
            })
    })
}