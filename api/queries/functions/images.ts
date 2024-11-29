import { Api } from "@jellyfin/sdk/lib/api"
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"

export function fetchItemImage(api: Api, itemId: string, imageType?: ImageType, width?: number) {

        return getImageApi(api).getItemImageUrlById(itemId, imageType)
}