import { Api } from "@jellyfin/sdk/lib/api"
import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"




export function fetchImage(api: Api, itemId: string, imageType?: ImageType) : Promise<string> {
    return api.axiosInstance
        .get(getImageApi(api).getItemImageUrlById(itemId, imageType))
        .then((response) => {
            console.log(response.data);
            return convertFileToBase64(response.data);
        })
}


export function fetchArtistImage(api: Api, artistId: string, imageType?: ImageType) : Promise<string> {
    return new Promise(async (resolve, reject) => {
        let response = await getImageApi(api).getArtistImage({ 
            name: "",
            imageIndex: 1,
            imageType: imageType ? imageType : ImageType.Primary 
        })

        console.log(response.data)

        if (_.isEmpty(response.data))
            reject(new Error("No image for artist"))
        
        resolve(convertFileToBase64(response.data));
    });
}

export function fetchItemImage(api: Api, itemId: string, imageType?: ImageType, width?: number) {
    
    return getImageApi(api).getItemImage({ 
        itemId, 
        imageType: imageType ? imageType : ImageType.Primary,
        format: ImageFormat.Jpg
    })
    .then((response) => {
        console.log(convertFileToBase64(response.data))
        return convertFileToBase64(response.data);
    })
}

function base64toJpeg(encode: string) : string {
    return `data:image/jpeg;base64,${encode}`;
}

function convertFileToBase64(file: any): string {
    console.debug("Converting file to base64", file)
    return base64toJpeg(Buffer.from(file, 'binary').toString('base64'));
}