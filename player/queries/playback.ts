import { Query, QueryFunction, useQueries, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { getActiveTrack, getProgress, pause, play, removeUpcomingTracks, setupPlayer } from "react-native-track-player/lib/src/trackPlayer"
import { getPlaystateApi } from "@jellyfin/sdk/lib/utils/api/playstate-api"
import { useApi } from "../../api/queries";
import { Progress, Track } from "react-native-track-player";
import { QueryKeys } from "../../enums/query-keys";

const usePause : UseQueryOptions = {
    queryKey: [QueryKeys.Pause],
    queryFn: () => {
        return pause();
    }
}

const usePlay : UseQueryOptions = {
    queryKey: [QueryKeys.Play],
    queryFn: () => {
        return play();
    }
}

const useProgress : UseQueryResult<Progress, Error> = useQuery({
    queryKey: [QueryKeys.Progress],
    queryFn: () => {
        return getProgress()
            .then((progress => {
                if (!!!progress)
                    throw new Error("Tried to fetch progress when there wasn't a currently active track");
            }))
    }
})

const useReportPlaybackStarted : UseQueryOptions = {
    queryKey: [QueryKeys.ReportPlaybackStarted],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApi.data!).reportPlaybackStart({playbackStartInfo: { ItemId: track.id, PositionTicks: useProgress.data!.position }})
        })
    }
}

const useReportPlaybackStopped : UseQueryOptions = {
    queryKey: [QueryKeys.ReportPlaybackStopped],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApi.data!).reportPlaybackStopped({playbackStopInfo: { ItemId: track.id, PositionTicks: useProgress.data!.position }})
        })
    }
}

export const useReportPlaybackProgress : UseQueryResult = useQuery({
    queryKey: [QueryKeys.ReportPlaybackPosition],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApi.data!).reportPlaybackProgress({playbackProgressInfo: { ItemId: track.id, PositionTicks: useProgress.data!.position }})
        })
    }
});

export const usePauseAndReportPlaybackStopped = useQueries({
    queries: [useReportPlaybackStopped, usePause]
})

export const usePlayAndReportPlayback = useQueries({
    queries: [useReportPlaybackStarted, usePlay]
})