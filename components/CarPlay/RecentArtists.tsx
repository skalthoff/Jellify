import { queryClient } from "@/constants/query-client"
import Client from "../../api/client"
import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api"
import { GridTemplate, ListTemplate } from "react-native-carplay"
import { QueryKeys } from "@/enums/query-keys"

export const CarPlayRecentArtists = (artists : BaseItemDto[]) => new ListTemplate({
    title: "Recently Played",
    sections: [
        {
            items: artists.map(artist => {
                return {
                    id: artist.Id!,
                    text: artist.Name ? artist.Name : "Untitled Track",
                    image: {
                        uri: queryClient.getQueryData([ QueryKeys.ItemImage, ImageType.Primary ])
                    }
                }
            })
        }
    ]
})