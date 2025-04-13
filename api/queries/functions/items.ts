import Client from "../../client";
import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";
import { QueryConfig } from "../query.config";
import { sortOptions, sortOrderOptions } from "../../../components/Library/components/library-filter-bar";

export type LibraryItemKind = 
    | typeof BaseItemKind.MusicAlbum
    | typeof BaseItemKind.MusicArtist
    | typeof BaseItemKind.Audio
    | typeof BaseItemKind.Playlist;

export type LibrarySortBy =
    | typeof ItemSortBy.SortName
    | typeof ItemSortBy.DateCreated
    | typeof ItemSortBy.DatePlayed
    | typeof ItemSortBy.PlayCount
    | typeof ItemSortBy.Random;

export type LibrarySortOrder = 
    | typeof SortOrder.Ascending
    | typeof SortOrder.Descending;

export interface FetchItemsParams {
    itemType: LibraryItemKind;
    isFavorite?: boolean;
    page?: number;
    sortBy?: LibrarySortBy[];
    sortOrder?: LibrarySortOrder[];
    limit?: number;
}

export interface FetchItemsResponse {
    items: BaseItemDto[];
    hasMore: boolean;
}

export function hasMoreItems(items: BaseItemDto[], limit: number = QueryConfig.limits.pageSize): boolean {
    return items.length === limit;
}

export function fetchItems(params: FetchItemsParams): Promise<FetchItemsResponse> {
    const { 
        itemType,
        isFavorite = false, 
        page,
        sortBy = [sortOptions[0].value], 
        sortOrder = [sortOrderOptions[0].value], 
        limit = QueryConfig.limits.pageSize 
    } = params;

    console.debug(`Fetching ${isFavorite ? 'favorite' : ''} ${itemType}`);

    const startIndex = page ? page * limit : 0;

    return new Promise(async (resolve, reject) => {
        getItemsApi(Client.api!)
            .getItems({
                includeItemTypes: [itemType],
                isFavorite,
                parentId: Client.library!.musicLibraryId,
                recursive: true, 
                sortBy,
                sortOrder,
                startIndex,
                limit
            })
            .then((response) => {
                console.debug(`Received ${itemType} response`, response);
                const items = response.data.Items ?? [];
                resolve({
                    items,
                    hasMore: hasMoreItems(items, limit)
                });
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
}