import Client from "../../client";
import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder, UserItemDataDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";

export function fetchArtists(isFavorite = false, page?: number): Promise<BaseItemDto[]> {
    console.debug(`Fetching All artists`);

    // option pagination for large libraries
    // set to 100 for now to test performance
    const startIndex = page ? page * 100 : undefined
    const endIndex = page ? page * 100 + 99 : undefined

    return new Promise(async (resolve, reject) => {
        getItemsApi(Client.api!)
            .getItems({
                includeItemTypes: [
                    BaseItemKind.MusicArtist
                ],
                isFavorite: isFavorite,
                parentId: Client.library!.musicLibraryId,
                recursive: true,
                sortBy: [
                    ItemSortBy.SortName
                ],
                sortOrder: [
                    SortOrder.Ascending
                ],
                startIndex: startIndex,
                limit: endIndex
            })
            .then((response) => {
                console.debug(`Received artist response`, response);

                if (response.data.Items)
                    resolve(response.data.Items)
                else
                    resolve([]);
            }).catch((error) => {
                console.error(error);
                reject(error);
            })
    })
}