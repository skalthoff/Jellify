import { SongInfo } from "@jellyfin/sdk/lib/generated-client/models";
import { PitchAlgorithm, RatingType, Track, TrackType } from "react-native-track-player"

export interface JellifyTrack extends Track {
    url: string;
    type?: TrackType | undefined;
    userAgent?: string | undefined;
    contentType?: string | undefined;
    pitchAlgorithm?: PitchAlgorithm | undefined;
    headers?: { [key: string]: any; } | undefined;

    title?: string | undefined;
    album?: string | undefined;
    artist?: string | undefined;
    duration?: number | undefined;
    artwork?: string | undefined;
    description?: string | undefined;
    genre?: string | undefined;
    date?: string | undefined;
    rating?: RatingType | undefined;
    isLiveStream?: boolean | undefined;

    Year?: number | null | undefined;
    IndexNumber?: number | null | undefined;
    ParentIndexNumber?: number | null | undefined;
}