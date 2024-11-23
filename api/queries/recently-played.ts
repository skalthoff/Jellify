import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";

export const useRecentlyPlayed = (api: Api) => useQuery({
    queryKey: [QueryKeys.RecentlyPlayed],
    queryFn: () => {

    }
})