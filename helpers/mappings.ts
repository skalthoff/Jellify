import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { JellifyTrack } from "../types/JellifyTrack";
import { TrackType } from "react-native-track-player";
import { Api } from "@jellyfin/sdk";
import { QueuingType } from "../enums/queuing-type";

export function mapDtoToTrack(api: Api, item: BaseItemDto, queuingType?: QueuingType) {

    return {
        url: `${api.basePath}/Audio/${item.Id!}/universal?TranscodingProtocol=hls?EnableRemoteMedia=true?EnableRedirection=true`,
        type: TrackType.HLS,
        headers: {
            "X-Emby-Token": api.accessToken

        },
        title: item.Name,
        album: item.Album,
        artist: item.Artists?.join(", "),
        duration: item.RunTimeTicks,
        QueuingType: queuingType ?? QueuingType.DirectlyQueued
    } as JellifyTrack
}