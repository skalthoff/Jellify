import { Api } from "@jellyfin/sdk/lib/api"
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"


export function fetchItemImage(api: Api, itemId: string, imageType?: ImageType, width?: number) {
    
    return getImageApi(api).getItemImage({ itemId, imageType: imageType ? imageType : ImageType.Primary })
        .then((response) => {
            console.log(response);
            convertFileToBase64((response.data as File))
                .then((encode) => {
                    console.log(encode);
                    return encode;
                })
        })
}

function convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (!_.isEmpty(reader.result))
                resolve(reader.result.toString())
        }
    })
}