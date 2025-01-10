import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models/item-sort-by";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { useQuery } from "@tanstack/react-query";

export const useItemTracks = (itemId: string, api: Api) => useQuery({
    queryKey: [QueryKeys.ItemTracks, itemId, api],
    queryFn: ({ queryKey }) => {

        const itemId : string = queryKey[1] as string;
        const api : Api = queryKey[2] as Api;

        return getItemsApi(api).getItems({
            parentId: itemId,
            sortBy: [
                ItemSortBy.ParentIndexNumber,
                ItemSortBy.IndexNumber,
                ItemSortBy.SortName
            ]
        })
        .then((response) => {
            return response.data.Items ? response.data.Items! : [];
        })
    }
})