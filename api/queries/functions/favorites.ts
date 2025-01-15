import { Api } from "@jellyfin/sdk";
import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";

export function fetchFavoriteArtists(api: Api, musicLibraryId: string): Promise<BaseItemDto[]> {
    console.debug(`Fetching user's favorite artists`);

    return new Promise(async (resolve, reject) => {
        getItemsApi(api)
            .getItems({
                includeItemTypes: [
                    BaseItemKind.MusicArtist
                ],
                isFavorite: true,
                parentId: musicLibraryId,
                recursive: true,
                sortBy: [
                    ItemSortBy.SortName
                ],
                sortOrder: [
                    SortOrder.Descending
                ]
            })
            .then((response) => {
                console.debug(`Received favorite artist response`, response);

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

export function fetchFavoriteAlbums(api: Api, musicLibraryId: string): Promise<BaseItemDto[]> {
    console.debug(`Fetching user's favorite albums`);

    return new Promise(async (resolve, reject) => {
        getItemsApi(api)
            .getItems({
                includeItemTypes: [
                    BaseItemKind.MusicAlbum
                ],
                isFavorite: true,
                parentId: musicLibraryId,
                recursive: true,
                sortBy: [
                    ItemSortBy.SortName
                ],
                sortOrder: [
                    SortOrder.Descending
                ]
            })
            .then((response) => {
                console.debug(`Received favorite album response`, response);

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

export function fetchFavoriteTracks(api: Api, musicLibraryId: string): Promise<BaseItemDto[]> {
    console.debug(`Fetching user's favorite artists`);

    return new Promise(async (resolve, reject) => {
        getItemsApi(api)
            .getItems({
                includeItemTypes: [
                    BaseItemKind.Audio
                ],
                isFavorite: true,
                parentId: musicLibraryId,
                recursive: true,
                sortBy: [
                    ItemSortBy.SortName
                ],
                sortOrder: [
                    SortOrder.Descending
                ]
            })
            .then((response) => {
                console.debug(`Received favorite artist response`, response);

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