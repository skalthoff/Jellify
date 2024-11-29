import { useQueries, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"
import { getActiveTrack, getProgress, pause, play } from "react-native-track-player/lib/src/trackPlayer"
import { getPlaystateApi } from "@jellyfin/sdk/lib/utils/api/playstate-api"
import { Progress, Track } from "react-native-track-player";
import { QueryKeys } from "../../enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { useApiClientContext } from "../../components/jellyfin-api-provider";

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
            }));
    }
});

const useReportPlaybackStarted = {
    queryKey: [QueryKeys.ReportPlaybackStarted],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApiClientContext().apiClient!)
                .reportPlaybackStart({
                    playbackStartInfo: { 
                        ItemId: track.id, 
                        PositionTicks: useProgress.data!.position 
                    }
                });
        });
    }
}

const useReportPlaybackStopped = {
    queryKey: [QueryKeys.ReportPlaybackStopped],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback stopped when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApiClientContext().apiClient!)
                .reportPlaybackStopped({
                    playbackStopInfo: { 
                        ItemId: track.id, 
                        PositionTicks: useProgress.data!.position 
                    }
                });
        });
    }
}

export const useReportPlaybackProgress = {
    queryKey: [QueryKeys.ReportPlaybackPosition],
    queryFn: () => {
        getActiveTrack()
        .then(track => {
            if (!!!track) 
                throw new Error("Tried to report playback progress when there wasn't a currently active track");
            
            return track as Track;
        })
        .then(track => {
            getPlaystateApi(useApiClientContext().apiClient!)
                .reportPlaybackProgress({
                    playbackProgressInfo: { 
                        ItemId: track.id, 
                        PositionTicks: useProgress.data!.position 
                    }
                });
        });
    }
};

export const usePauseAndReportPlaybackStopped = useQueries({
    queries: [useReportPlaybackStopped, usePause]
})

export const usePlayAndReportPlayback = (api: Api) => useQueries({
    queries: [useReportPlaybackStarted, usePlay]
})