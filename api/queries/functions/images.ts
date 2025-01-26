import { ImageFormat, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { QueryConfig } from "../query.config";
import { Dirs, FileSystem } from 'react-native-file-access'

export async function fetchItemImage(
    itemId: string, 
    imageType: ImageType = ImageType.Primary, 
    width?: number, 
    height?: number
) : Promise<string> {
    
    return new Promise<string>((resolve, reject) => {
        FileSystem.exists(`${Dirs.CacheDir}/Images/${imageType}/${itemId}`)
            .then((imageExists) => {
                console.debug(`Item image ${imageExists ? 'exists' : 'does not exist'} in storage`);
                if (imageExists)
                    resolve(fetchItemImageFromStorage(itemId, imageType, width, height))
            });

        getImageApi(Client.api!)
            .getItemImage({
                itemId,
                imageType,
                width: width ? Math.ceil(width * 2) : QueryConfig.playerArtwork.width,
                height: height ? Math.ceil(height * 2) : QueryConfig.playerArtwork.height,
                format: ImageFormat.Jpg,
            }, {
                responseType: 'blob'
            })
            .then(async (response) => {
                const imageBlob = response.data as Blob

                console.debug(URL.createObjectURL(imageBlob));
                FileSystem.writeFile(
                    getImagePath(itemId, imageType, width, height),
                    await imageBlob.text()
                )

                resolve(URL.createObjectURL(response.data));
            })
            .catch(error => {
                reject(error)
            })
    })
}

async function fetchItemImageFromStorage(itemId: string, imageType: ImageType, width?: number, height?: number) {
    return await FileSystem.readFile(getImagePath(itemId, imageType, width, height));
}

function getImagePath(itemId: string, imageType: ImageType, width?: number, height?: number) {
    return `${Dirs.CacheDir}/Images/${imageType}/${itemId}-${width ?? QueryConfig.playerArtwork.width}-${height ?? QueryConfig.playerArtwork.height}`;
}