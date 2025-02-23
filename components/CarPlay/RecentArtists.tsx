import Client from "../../api/client"
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import { GridTemplate } from "react-native-carplay"

export const CarPlayRecentArtists = (artists : BaseItemDto[]) => new GridTemplate({
    title: "Recently Played",
    buttons: artists.map(artist => {
        return {
            id: artist.Id!,
            titleVariants: [
                artist.Name ? artist.Name : "Untitled Track"
            ],
            image: {
                uri: getImageApi(Client.api!).getItemImageUrlById(artist.Id!)
            }
        }
    })
})