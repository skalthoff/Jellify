import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { Dirs, FileSystem } from 'react-native-file-access'

export function fetchItemImage(itemId: string, imageType: ImageType = ImageType.Primary, width: number = 150, height: number = 150) {
    
    return new Promise<string>(async (resolve, reject) => {

        // Make sure images folder exists in cache, create if it doesn't
        if (!(await FileSystem.exists(`${Dirs.CacheDir}/images`)))
            await FileSystem.mkdir(`${Dirs.CacheDir}/images`)

        const existingImage = await FileSystem.exists(getImageFilePath(itemId, width, height, imageType));

        if (existingImage)
            resolve(await FileSystem.readFile(getImageFilePath(itemId, width, height, imageType), 'base64'));
        else
            getImageApi(Client.api!)
                .getItemImage({
                    itemId,
                    imageType,
                    width: Math.ceil(width),
                    height: Math.ceil(width),
                    format: ImageFormat.Jpg
                },
                {
                    responseType: 'blob',
                })
            .then(async (response) => {

                if (response.status < 300) {


                    FileSystem.writeFile(getImageFilePath(itemId, width, height, imageType), await blobToBase64(response.data), 'base64')
                    .then(async () => {
                        resolve(await FileSystem.readFile(getImageFilePath(itemId, width, height, imageType), 'base64'));
                    })
                } else {
                    reject();
                }
            }).catch((error) => {
                console.error(error);
                reject(error);
            })
    });
}

function getImageFilePath(itemId: string, width: number, height: number, imageType: ImageType) {
    return `${Dirs.CacheDir}/images/${itemId}_${imageType}_${width}x${height}.Jpg`
}

function blobToBase64(blob : Blob) {
    return new Promise<string>((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }