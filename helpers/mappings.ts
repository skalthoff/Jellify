import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { JellifyTrack } from "../types/JellifyTrack";
import { JellifyServer } from "../types/JellifyServer";
import { TrackType } from "react-native-track-player";
import { Api } from "@jellyfin/sdk";

export function mapDtoToTrack(api: Api, item: BaseItemDto) {
    return {
        url: `${api.basePath}/Audio/${item.Id!}/universal`,
        type: TrackType.HLS,
        headers: {
            "X-Emby-Token": api.accessToken

        }
    } as JellifyTrack
}