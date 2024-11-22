import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api/image-api"
import { useApi } from "../queries";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { createApi } from "./functions/api";


export const useImageByItemId = (itemId: string, imageType: ImageType) => useQuery({
    queryKey: [QueryKeys.ImageByItemId, itemId],
    queryFn: (async ({ queryKey }) => {

        let imageFile = await getImageApi(await createApi())
        .getItemImage({ itemId: queryKey[1], imageType: imageType })
        .then((response) => {
            // This should be returning a File per Jellyfin's docs
            // https://typescript-sdk.jellyfin.org/classes/generated_client.ImageApi.html#getItemImage
            return (response.data as File)
        });

        return await imageFile.text();
    })
})