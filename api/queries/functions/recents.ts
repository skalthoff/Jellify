import { Api } from "@jellyfin/sdk/lib/api";
import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { queryConfig } from "../query.config";

export function fetchRecentlyPlayed(api: Api, libraryId: string): Promise<BaseItemDto[]> {

    console.debug("Fetching recently played items");

    return new Promise(async (resolve, reject) => {
        getItemsApi(api)
        .getItems({ 
            includeItemTypes: [
                BaseItemKind.Audio
            ],
            limit: queryConfig.limits.recents,
            parentId: libraryId, 
            recursive: true,
            sortBy: [ 
                ItemSortBy.DatePlayed 
            ], 
            sortOrder: [
                SortOrder.Descending
            ],
        })
        .then((response) => {

            console.debug("Received recently played items response");

            if (response.data.Items)
                resolve(response.data.Items);
            else {
                resolve([]);
            }
        }).catch((error) => {
            console.error(error);
            reject(error);
        })
    })
}