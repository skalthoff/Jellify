import Client from "@/api/client";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { GridTemplate } from "react-native-carplay";

export const CarPlayRecentlyPlayed = (recentTracks : BaseItemDto[]) => new GridTemplate({
    title: "Recently Played",
    buttons: recentTracks.map(track => {
        return {
            id: track.Id!,
            titleVariants: [
                track.Name ? track.Name : "Untitled Track"
            ],
            image: {
                uri: getImageApi(Client.api!).getItemImageUrlById(track.Id!)
            }
        }
    })     
})