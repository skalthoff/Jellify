import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { Dirs, FileSystem } from 'react-native-file-access'

export function fetchItemImage(itemId: string, imageType?: ImageType | undefined, width: number = 150, height: number = 150) {
    
    return new Promise<string>(async (resolve, reject) => {

        // Make sure images folder exists in cache, create if it doesn't
        if (!(await FileSystem.exists(`${Dirs.CacheDir}/images`)))
            await FileSystem.mkdir(`${Dirs.CacheDir}/images`)

        const existingImage = await FileSystem.exists(getImageFilePath(itemId, width, height, imageType))

        if (existingImage)
            resolve(await FileSystem.readFile(getImageFilePath(itemId, width, height, imageType)));
        else
            FileSystem.fetch(getImageApi(Client.api!)
                .getItemImageUrlById(
                    itemId,
                    imageType,
                    {
                        width: Math.ceil(width),
                        height: Math.ceil(width),
                        format: ImageFormat.Jpg
                    }
                ), {
                headers: {
                    "X-Emby-Token": Client.api!.accessToken,
                    "responseType": 'blob'
                },
                path: getImageFilePath(itemId, width, height, imageType)
            }).then(async (result) => {

                console.debug(result);

                if (result.ok)
                    resolve(await FileSystem.readFile(getImageFilePath(itemId, width, height, imageType)));
                else
                    reject(result.statusText);
            }).catch((error) => {
                console.error(error);
                reject(error);
            })
    });
}

function getImageFilePath(itemId: string, width: number, height: number, imageType?: ImageType | undefined) {
    return `${Dirs.CacheDir}/images/${itemId}_${imageType ? `${imageType}_` : ''}${width}x${height}.Jpg`
}