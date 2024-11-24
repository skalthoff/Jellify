import { Api } from "@jellyfin/sdk/lib/api";
import { BaseItemDto, ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";

export function fetchRecentlyPlayed(api: Api): Promise<BaseItemDto[]> {

    console.debug("Fetching recently played items");

    return new Promise(async (resolve, reject) => {
        getItemsApi(api).getItems({ sortBy: [ ItemSortBy.DatePlayed ], limit: 100 })
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