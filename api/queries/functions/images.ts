import { Api } from "@jellyfin/sdk/lib/api"
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"


export function fetchItemImage(api: Api, itemId: string, imageType?: ImageType, width?: number) {
    
    return getImageApi(api).getItemImage({ itemId, imageType: imageType ? imageType : ImageType.Primary })
        .then((response) => {
            return response.data;
        })
}

function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (!_.isEmpty(reader.result))
                resolve(reader.result.toString())
            else
                reject(new Error("Unable to convert file to base64"));
        }

        reader.onerror = (error) => {
            reject(error);
        }

        reader.readAsDataURL(file);
    });
}