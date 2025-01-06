import { State } from "react-native-track-player";
import { JellifyTrack } from "../types/JellifyTrack";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums/query-keys";
import { PlaystateApi } from "@jellyfin/sdk/lib/generated-client/api/playstate-api";

export const handlePlaybackStateChange = (state: State, sessionId: string, playStateApi: PlaystateApi, activeTrack: JellifyTrack) => useQuery({
    queryKey: [QueryKeys.PlaybackStateChange, state, sessionId, activeTrack, playStateApi],
    queryFn: ({ queryKey }) => {
        const state : State = queryKey[1] as State;
        const sessionId : string = queryKey[2] as string;
        const activeTrack : JellifyTrack = queryKey[3] as JellifyTrack;
        const playStateApi : PlaystateApi = queryKey[4] as PlaystateApi;

        switch (state) {            
            case (State.Playing) : {
                playStateApi.reportPlaybackStart({
                    playbackStartInfo: {
                        SessionId: sessionId,
                        ItemId: activeTrack.ItemId
                    }
                })
            }
            
            default: {
                playStateApi.reportPlaybackStopped({
                    playbackStopInfo: {
                        SessionId: sessionId,
                        ItemId: activeTrack.ItemId
                    }
                })
            }
        }
    }
});