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
        .then(async (response) => {
            console.log(response.data)
            return new Blob(response.data)
        }).then(async (blob) => {
            const encoding = await blobToBase64(blob)
            console.debug(encoding);
            return encoding;
        });
}

function base64toJpeg(encode: string) : string {
    return `data:image/jpeg;base64,${encode}`;
}

function blobToBase64(blob : Blob) : Promise<string> {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.toString());
      reader.readAsDataURL(blob);
    });
  }