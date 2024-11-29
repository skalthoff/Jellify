import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { fetchItemImage } from "./functions/images";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";

export const useItemImage = (api: Api, itemId: string, imageType?: ImageType, width?: number) => useQuery({
    queryKey: [QueryKeys.ItemImage, api, itemId, imageType, width],
    queryFn: ({ queryKey }) => fetchItemImage(queryKey[1] as Api, queryKey[2] as string, imageType, width)
});