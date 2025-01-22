import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"

export function fetchItemImage(itemId: string, imageType?: ImageType, width?: number) {
    
    return getImageApi(Client.api!)
        .getItemImage({ 
            itemId, 
            imageType: imageType ? imageType : ImageType.Primary,
            format: ImageFormat.Jpg
        }, {
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response)
            return URL.createObjectURL(response.data)
        });
}