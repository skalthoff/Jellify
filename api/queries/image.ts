import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { fetchItemImage } from "./functions/images";

export const useItemImage = (api: Api, itemId: string) => useQuery({
    queryKey: [QueryKeys.ItemImage, api, itemId],
    queryFn: ({ queryKey }) => fetchItemImage(queryKey[1] as Api, queryKey[2] as string)
});