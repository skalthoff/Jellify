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
            .then(async (imageExists) => {
                console.debug(`Item image ${imageExists ? 'exists' : 'does not exist'} in storage`);
                if (imageExists)
                    resolve(await fetchItemImageFromStorage(itemId, imageType, width, height));
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
            .then(async ({ data } : { data: Blob }) => {

                data.text()
                    .then((text) => {
                        console.debug("Writing image to file")
                        FileSystem.writeFile(
                            getImagePath(itemId, imageType, width, height),
                            text
                        ).then(() => {
                            console.debug("Successfully wrote image to file")
                            resolve(URL.createObjectURL(data));
                        }).catch(() => {
                            console.debug("Unable to write image to file, exiting...")
                            resolve(URL.createObjectURL(data));
                        });
                    })
                    .catch(() => {
                        console.debug("Unable to read blob, not storing")
                        resolve(URL.createObjectURL(data));
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
}

async function fetchItemImageFromStorage(itemId: string, imageType: ImageType, width?: number, height?: number) {
    return await FileSystem.readFile(getImagePath(itemId, imageType, width, height));
}

function getImagePath(itemId: string, imageType: ImageType, width?: number, height?: number) {
    return `${Dirs.CacheDir}/Images/${imageType}/${itemId}-${width ?? QueryConfig.playerArtwork.width}-${height ?? QueryConfig.playerArtwork.height}`;
}