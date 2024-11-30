import { Api } from "@jellyfin/sdk/lib/api"
import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"

export function fetchArtistImage(api: Api, artistId: string, imageType?: ImageType) {
    return getImageApi(api).getArtistImage({ 
        name: "",
        imageIndex: 1,
        imageType: imageType ? imageType : ImageType.Primary 
    })
    .then((response) => {
        console.log(response.data)
        return response.data;
    })
}

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
    console.debug("Converting file to base64", file)
    return Buffer.from(file, 'binary').toString('base64');
}