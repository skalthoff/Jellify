import { State } from "react-native-track-player";
import { JellifyTrack } from "../types/JellifyTrack";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums/query-keys";
import { PlaystateApi } from "@jellyfin/sdk/lib/generated-client/api/playstate-api";

export const handlePlaybackStateChange(state: State, playStateApi: PlaystateApi, activeTrack: JellifyTrack) => useQuery({
    queryKey: [QueryKeys.PlaybackStateChange, state, activeTrack, playStateApi],
    queryFn: ({ queryKey }) => {
        let state : State = queryKey[1] as State;
        let activeTrack : JellifyTrack = queryKey[2] as JellifyTrack;
        let api : PlaystateApi = queryKey[3] as PlaystateApi;

        switch (state) {
            case (State.Ended) :
            case (State.Paused) :
            case (State.Stopped) : {

            }

            case (State.Playing) : {
                
            }
        }
    }
});