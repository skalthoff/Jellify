import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { Dirs, FileSystem } from 'react-native-file-access'

export function fetchItemImage(itemId: string, imageType: ImageType = ImageType.Primary, width: number = 150, height: number = 150) {
    
    return new Promise<string>(async (resolve, reject) => {

        const existingImage = await FileSystem.exists(getImageFilePath(itemId, imageType, width, height))

        if (existingImage)
            resolve(await FileSystem.readFile(getImageFilePath(itemId, imageType, width, height)));
        else
            FileSystem.fetch(getImageApi(Client.api!)
                .getItemImageUrlById(
                    itemId,
                    imageType,
                    {
                        width,
                        height,
                        format: ImageFormat.Jpg
                    }
                ), {
                headers: {
                    "X-Emby-Token": Client.api!.accessToken
                },
                path: getImageFilePath(itemId, imageType, width, height)
            }).then(async (result) => {

                console.debug(result);

                if (result.ok)
                    resolve(await FileSystem.readFile(getImageFilePath(itemId, imageType, width, height)));
                else
                    reject(result.statusText);
            }).catch((error) => {
                reject(error);
            })
    });
}

function getImageFilePath(itemId: string, imageType: ImageType, width: number, height: number) {
    return `${Dirs.CacheDir}/images/${itemId}_${imageType}_${width}x${height}.${ImageFormat.Jpg}`
}