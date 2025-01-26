import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchItemImage } from "./functions/images";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";

export const useItemImage = (itemId: string, imageType?: ImageType, width?: number, height?: number) => useQuery({
    queryKey: [QueryKeys.ItemImage, itemId, imageType, width, height],
    queryFn: () => fetchItemImage(itemId, imageType, width, height),
    retry: 3,
    staleTime: 1000
});