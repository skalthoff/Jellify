import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models/item-sort-by";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "./query.config";

export const useItemTracks = (itemId: string, api: Api, sort: boolean = false) => useQuery({
    queryKey: [QueryKeys.ItemTracks, itemId, api, sort],
    queryFn: ({ queryKey }) => {

        const itemId : string = queryKey[1] as string;
        const api : Api = queryKey[2] as Api;
        const sort : boolean = queryKey[3] as boolean;

        let sortBy: ItemSortBy[] = [];

        if (sort) {
            sortBy = [
                ItemSortBy.ParentIndexNumber,
                ItemSortBy.IndexNumber,
                ItemSortBy.SortName
            ]
        }

        return getItemsApi(api).getItems({
            parentId: itemId,
            sortBy
        })
        .then((response) => {
            return response.data.Items ? response.data.Items! : [];
        })
    },
    staleTime: queryConfig.staleTime
})