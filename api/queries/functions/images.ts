import { Api } from "@jellyfin/sdk/lib/api"
import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"


export function fetchItemImage(api: Api, itemId: string, imageType?: ImageType, width?: number) {
    
    return getImageApi(api).getItemImage({ 
        itemId, 
        imageType: imageType ? imageType : ImageType.Primary,
        format: ImageFormat.Jpg
    })
    .then((response) => {
        console.log(`data:image/jpeg;base64,${convertFileToBase64(response.data)}`)
        return `data:image/jpeg;base64,${convertFileToBase64(response.data)}`;
    })
}

function convertFileToBase64(file: any): string {
    return Buffer.from(file, 'binary').toString('base64');
}