import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { JellifyTrack } from "../types/JellifyTrack";
import { RatingType, TrackType } from "react-native-track-player";
import { Api } from "@jellyfin/sdk";
import { QueuingType } from "../enums/queuing-type";
import querystring from "querystring"
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import Client from "../api/client";

const container = "opus,mp3,aac,m4a,flac,webma,webm,wav,ogg,mpa,wma";

// TODO: Make this configurable
const transcodingContainer = "m4a";

export function mapDtoToTrack(item: BaseItemDto, queuingType?: QueuingType) : JellifyTrack {

    const urlParams = {
        "Container": container,
        "TranscodingContainer": transcodingContainer,
        "TranscodingProtocol": "hls",
        "EnableRemoteMedia": true,
        "EnableRedirection": true,
        "api_key": Client.api!.accessToken,
        "StartTimeTicks": 0,
        "PlaySessionId": Client.sessionId,
    }

    return {
        url: `${Client.api!.basePath}/Audio/${item.Id!}/universal?${querystring.stringify(urlParams)}`,
        type: TrackType.HLS,
        headers: {
            "X-Emby-Token": Client.api!.accessToken
        },
        title: item.Name,
        album: item.Album,
        artist: item.Artists?.join(", "),
        duration: item.RunTimeTicks,
        artwork: getImageApi(Client.api!).getItemImageUrlById(item.Id!),

        rating: item.UserData?.IsFavorite ? RatingType.Heart : undefined,
        item,
        QueuingType: queuingType ?? QueuingType.DirectlyQueued
    } as JellifyTrack
}