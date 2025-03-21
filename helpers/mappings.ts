import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { JellifyTrack } from "../types/JellifyTrack";
import { RatingType, TrackType } from "react-native-track-player";
import { QueuingType } from "../enums/queuing-type";
import { getImageApi, getMediaInfoApi } from "@jellyfin/sdk/lib/utils/api";
import Client from "../api/client";
import { isUndefined } from "lodash";

export async function mapDtoToTrack(item: BaseItemDto, queuingType?: QueuingType) : Promise<JellifyTrack> {
    
    const mediaInfoApi = getMediaInfoApi(Client.api!)

    const url = await mediaInfoApi.getPlaybackInfo({
        itemId: item.Id!,
    })
    .then((response) => {
        return response.data.MediaSources![0].TranscodingUrl!
    })

    const isFavorite = !isUndefined(item.UserData) && (item.UserData.IsFavorite ?? false);

    return {
        url,
        type: TrackType.HLS,
        headers: {
            "X-Emby-Token": Client.api!.accessToken
        },
        title: item.Name,
        album: item.Album,
        artist: item.Artists?.join(", "),
        duration: item.RunTimeTicks,
        artwork: item.AlbumId ? getImageApi(Client.api!).getItemImageUrlById(item.AlbumId, ImageType.Primary, { width: 300, height: 300 }) : undefined,

        rating: isFavorite ? RatingType.Heart : undefined,
        item,
        QueuingType: queuingType ?? QueuingType.DirectlyQueued
    } as JellifyTrack
}