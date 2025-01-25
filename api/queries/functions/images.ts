import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { QueryConfig } from "../query.config";

export function fetchItemImage(itemId: string, imageType?: ImageType, width?: number, height?: number) {
    
    return getImageApi(Client.api!)
        .getItemImage({ 
            itemId, 
            imageType: imageType ? imageType : ImageType.Primary,
            width: width ? Math.floor(width) : QueryConfig.playerArtwork.width,
            height: height ? Math.floor(height) : QueryConfig.playerArtwork.height
        }, {
            responseType: 'blob'
        })
        .then((response) => {
            console.log(response)
            return URL.createObjectURL(response.data)
        });
}