import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "../queries";
import { QueryKeys } from "../../enums/query-keys";

export const useChildrenFromParent = (queryKey: QueryKeys, parentId: string) => useQuery({
    queryKey: [queryKey, parentId],
    queryFn: (({ queryKey }) => {
        return getItemsApi(useApi.data!)
            .getItems({ parentId: queryKey[1] })
            .then((result) => {
                // If our response is empty or null, return empty array
                if (!!!result.data.Items)
                    return [];
                return result.data.Items!
            });
    })
});