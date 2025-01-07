import { Progress } from "react-native-track-player";
import { JellifyTrack } from "../types/JellifyTrack";
import { PlaystateApi } from "@jellyfin/sdk/lib/generated-client/api/playstate-api";
import { convertSecondsToRunTimeTicks } from "@/helpers/runtimeticks";

export async function handlePlaybackStopped(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack) {
    console.debug("Stopping playback for session");
    
    return playstateApi.reportPlaybackStopped({
        playbackStopInfo: {
            SessionId: sessionId,
            ItemId: track.ItemId
        }
    })
}

export async function handlePlaybackStarted(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack) {
    console.debug("Starting playback for session");

    return playstateApi.reportPlaybackStart({
        playbackStartInfo: {
            SessionId: sessionId,
            ItemId: track.ItemId
        }
    })
}

export async function handlePlaybackProgressUpdated(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack, progress: Progress) {
    console.debug("Reporting playback progress");

    return playstateApi.reportPlaybackProgress({
        playbackProgressInfo: {
            SessionId: sessionId,
            ItemId: track.ItemId,
            PositionTicks: convertSecondsToRunTimeTicks(progress.position)
        }
    });
}
