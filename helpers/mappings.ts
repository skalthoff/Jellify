import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models"
import { PitchAlgorithm, RatingType, Track, TrackType } from "react-native-track-player"
import { JellifyTrack } from "../types/JellifyTrack"
import { useApi } from "../api/queries"
import _ from "lodash";
import { useImageByItemId } from "../api/queries/image";
import { QueuingType } from "../enums/queuing-type";
let clientName : string = require('root-require')('./package.json').name

export function mapDtoToJellifyTrack(item: BaseItemDto, queuingType: QueuingType) : JellifyTrack {
    return {
        url: `${useApi.data!.basePath}/Audio/${item.Id!}/universal`,
        type: TrackType.HLS, // TODO: Confirm this
        userAgent: clientName,
        contentType: _.isNull(item.Container) ? undefined : item.Container,
        pitchAlgorithm: PitchAlgorithm.Music,
        headers: {
            "Authorization": useApi.data?.authorizationHeader
        },

        title: _.isNull(item.Name) ? undefined : item.Name,
        album: _.isNull(item.Album) ? undefined : item.Album,
        artist: _.isNull(item.Artists) ? undefined : item.Artists?.join(", "),
        duration: _.isNull(item.RunTimeTicks) ? undefined : item.RunTimeTicks,
        artwork: useImageByItemId(item.Id!, ImageType.Primary).data,

        genre: _.isNull(item.Genres) ? undefined : item.Genres?.join(", "),
        date: _.isNull(item.PremiereDate) ? undefined : item.PremiereDate,
        // rating
        isLiveStream: false, // TODO: only for iOS
        QueuingType: queuingType
    }
}