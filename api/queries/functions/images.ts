import { ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import _ from "lodash"
import Client from "../../../api/client"
import { QueryConfig } from "../query.config";
import { Dirs, FileSystem } from 'react-native-file-access'

export async function fetchItemImage(itemId: string, imageType?: ImageType, width?: number, height?: number) {
    
    if (await FileSystem.exists(`${Dirs.CacheDir}/Images/${imageType ?? ImageType.Primary}/${itemId}`))
        return FileSystem.readFile(getImagePath(itemId, imageType, width, height))

    return FileSystem.fetch(
        getImageApi(Client.api!)
            .getItemImageUrlById(
                itemId, 
                imageType ?? ImageType.Primary, 
                { 
                    width: width ? Math.ceil(width * 2) : QueryConfig.playerArtwork.width,
                    height: height ? Math.ceil(height * 2) : QueryConfig.playerArtwork.height
                }
            ),
            {
                path: getImagePath(itemId, imageType, width, height),
            }
    ).then((result) => {
        return result.url
    })
}

function getImagePath(itemId: string, imageType?: ImageType, width?: number, height?: number) {
    return `${Dirs.CacheDir}/Images/${imageType ?? ImageType.Primary}/${itemId}-${width ?? QueryConfig.playerArtwork.width}-${height ?? QueryConfig.playerArtwork.height}`;
}