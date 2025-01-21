import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchItemImage } from "./functions/images";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";

export const useItemImage = (itemId: string, imageType?: ImageType, width?: number) => useQuery({
    queryKey: [QueryKeys.ItemImage, itemId, imageType, width],
    queryFn: () => fetchItemImage(itemId, imageType, width)
});