import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models"
import { Track } from "react-native-track-player"
import { JellifyTrack } from "../types/JellifyTrack"
import { useApi } from "../api/queries"

export function mapDtoToJellifyTrack(item: BaseItemDto) : JellifyTrack {
    return {
        url: `${useApi.data!.basePath}/Audio/${item.Id!}/universal`,
    }
}