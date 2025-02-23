import { queryClient } from "../../constants/query-client"
import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { ListTemplate } from "react-native-carplay"
import { QueryKeys } from "../../enums/query-keys"

export const CarPlayRecentArtists = (artists : BaseItemDto[] | undefined) => new ListTemplate({
    title: "Recently Played",
    sections: [
        {
            items: artists ? artists.map(artist => {
                return {
                    id: artist.Id!,
                    text: artist.Name ? artist.Name : "Untitled Track",
                    image: {
                        uri: queryClient.getQueryData([ QueryKeys.ItemImage, ImageType.Primary ])
                    }
                }
            }) : []
        }
    ]
})