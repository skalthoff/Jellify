import { Progress, State } from "react-native-track-player";
import { JellifyTrack } from "../types/JellifyTrack";
import { PlaystateApi } from "@jellyfin/sdk/lib/generated-client/api/playstate-api";
import { convertSecondsToRunTimeTicks } from "@/helpers/runtimeticks";

export async function handlePlaybackState(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack, state: State) {
    switch (state) {            
        case (State.Playing) : {
            await playstateApi.reportPlaybackStart({
                playbackStartInfo: {
                    SessionId: sessionId,
                    ItemId: track.ItemId
                }
            })
        }
        
        case (State.Ended) :
        case (State.Paused) :
        case (State.Stopped) : {
            await playstateApi.reportPlaybackStopped({
                playbackStopInfo: {
                    SessionId: sessionId,
                    ItemId: track.ItemId
                }
            })
        }

        default : {
            return;
        }
    }
}

export async function handlePlaybackStopped(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack) {
    console.debug("Stopping playback for session");
    
    await playstateApi.reportPlaybackStopped({
        playbackStopInfo: {
            SessionId: sessionId,
            ItemId: track.ItemId
        }
    })
}

export async function handlePlaybackStarted(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack) {
    console.debug("Starting playback for session");

    await playstateApi.reportPlaybackStart({
        playbackStartInfo: {
            SessionId: sessionId,
            ItemId: track.ItemId
        }
    })
}

export async function handlePlaybackProgressUpdated(sessionId: string, playstateApi: PlaystateApi, track: JellifyTrack, progress: Progress) {

    if (progress.duration - progress.position === 5)
        await playstateApi.reportPlaybackStopped({
            playbackStopInfo: {
                SessionId: sessionId,
                ItemId: track.ItemId
            }
        })
    else 
        return
}
