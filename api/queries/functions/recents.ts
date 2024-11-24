import { Api } from "@jellyfin/sdk/lib/api";
import { BaseItemDto, ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";

export function fetchRecentlyPlayed(api: Api): Promise<BaseItemDto[] | undefined> {
    return new Promise(async (resolve, reject) => {
        getItemsApi(api).getItems({ sortBy: [ ItemSortBy.DatePlayed ], limit: 100 })
            .then((response) => {

                if (response.data.Items)
                    resolve(response.data.Items);
                else {
                    resolve([]);
                }
            })
    })
}