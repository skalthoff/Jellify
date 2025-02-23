import Client from "../../api/client"
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import { GridTemplate, ListTemplate } from "react-native-carplay"

export const CarPlayRecentArtists = (artists : BaseItemDto[]) => new ListTemplate({
    title: "Recently Played",
    items: artists.map(artist => {
        return {
            id: artist.Id!,
            text: artist.Name ? artist.Name : "Untitled Track",
            image: {
                uri: getImageApi(Client.api!).getItemImageUrlById(artist.Id!)
            }
        }
    })
})