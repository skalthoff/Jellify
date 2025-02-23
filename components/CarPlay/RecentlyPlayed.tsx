import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { ListTemplate } from "react-native-carplay";

export const CarPlayRecentlyPlayed = (recentTracks : BaseItemDto[]) => new ListTemplate({
    title: "Recently Played",
    
    sections: [
        {
            header: `Recently Played`,
            items: recentTracks.map(track => {
                return {
                    id: track.Id!,
                    text: track.Name ? track.Name : "Untitled Track",
                    // image: {
                    //     uri: `file://${getImageFilePath(track.Id!, 150, 150, ImageType.Primary)}`
                    // }
                }
            })
        }
    ]     
})