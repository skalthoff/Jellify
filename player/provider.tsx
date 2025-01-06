import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { JellifyTrack } from "../types/JellifyTrack";
import { storage } from "../constants/storage";
import { MMKVStorageKeys } from "../enums/mmkv-storage-keys";
import { findPlayQueueIndexStart } from "./helpers/index";
import TrackPlayer, { Event, Progress, State, useActiveTrack, usePlaybackState, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import _ from "lodash";
import { buildNewQueue } from "./helpers/queue";
import { useApiClientContext } from "../components/jellyfin-api-provider";
import { getPlaystateApi } from "@jellyfin/sdk/lib/utils/api";
import { handlePlaybackStateChange, usePlaybackStopped } from "./handlers";
import { sleep } from "@/helpers/sleep";
import { useSetupPlayer } from "@/components/Player/hooks";
import { UPDATE_INTERVAL } from "./config";

interface PlayerContext {
    showPlayer: boolean;
    setShowPlayer: React.Dispatch<SetStateAction<boolean>>;
    showMiniplayer: boolean;
    setShowMiniplayer: React.Dispatch<SetStateAction<boolean>>;
    nowPlaying: JellifyTrack | undefined;
    queue: JellifyTrack[];
    play: (index?: number | undefined) => Promise<void>,
    pause: () => Promise<void>,
    resetQueue: (hideMiniplayer : boolean | undefined) => Promise<void>;
    addToQueue: (tracks: JellifyTrack[]) => Promise<void>;
    playbackState: State | undefined;
    progress: Progress | undefined;
}

const PlayerContextInitializer = () => {

    const queueJson = storage.getString(MMKVStorageKeys.PlayQueue);

    const { apiClient, sessionId } = useApiClientContext();
    const playStateApi = getPlaystateApi(apiClient!)
    
    //#region State
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [showMiniplayer, setShowMiniplayer] = useState<boolean>(false);

    const [nowPlaying, setNowPlaying] = useState<JellifyTrack | undefined>(undefined);
    const [queue, setQueue] = useState<JellifyTrack[]>(queueJson ? JSON.parse(queueJson) : []);
    //#endregion State

    
    //#region Functions
    const play = async (index?: number | undefined) => {

        if (index)
            TrackPlayer.skip(index)

        TrackPlayer.play();
        
        const activeTrack = await TrackPlayer.getActiveTrack() as JellifyTrack;

        playStateApi.reportPlaybackStart({
            playbackStartInfo: {
                SessionId: sessionId,
                ItemId: activeTrack.ItemId
            }
        })
    }

    const pause = async () => {
        TrackPlayer.pause();
        
        usePlaybackStopped(sessionId, playStateApi, nowPlaying!)
    }
    
    const resetQueue = async (hideMiniplayer?: boolean | undefined) => {
        console.debug("Clearing queue")
        await TrackPlayer.reset();
        setQueue([]);
        
        setShowMiniplayer(!hideMiniplayer)
    }
    
    const addToQueue = async (tracks: JellifyTrack[]) => {
        let insertIndex = findPlayQueueIndexStart(queue);
        console.debug(`Adding ${tracks.length} to queue at index ${insertIndex}`)
        
        await TrackPlayer.add(tracks, insertIndex);
        
        setQueue(buildNewQueue(queue, tracks, insertIndex))
        
        setShowMiniplayer(true);
    }
    //#endregion Functions
    
    //#region RNTP Setup
    const isPlayerReady = useSetupPlayer().isSuccess;

    useTrackPlayerEvents([
        Event.PlaybackActiveTrackChanged,
    ], async (event) => {
        switch (event.type) {
            case (Event.PlaybackActiveTrackChanged) : {
                
                console.debug("Active track changed");

                // Scrobble previously played track
                if (nowPlaying) {
                    usePlaybackStopped(sessionId, playStateApi, nowPlaying)
                }
                

                // Sleep before capturing the active track in case we are
                // skipping to an initial queue index 
                const activeTrack = await sleep(500).then(async () => {
                    return await TrackPlayer.getActiveTrack()
                }) as JellifyTrack;


                setNowPlaying(activeTrack);
            }
        }
    })

    const { state: playbackState } = usePlaybackState();
    const progress = useProgress(UPDATE_INTERVAL);

    useEffect(() => {
        if (!showMiniplayer)
            setNowPlaying(undefined);
    }, [
        showMiniplayer
    ])

    useEffect(() => {
        if (isPlayerReady)
          console.debug("Player is ready")
        else
          console.warn("Player could not be setup")
      }, [
        isPlayerReady
      ])
    //#endregion RNTP Setup

    //#region return
    return {
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
        nowPlaying,
        queue,
        play,
        pause,
        addToQueue,
        resetQueue,
        playbackState,
        progress,
    }
    //#endregion return
}

export const PlayerContext = createContext<PlayerContext>({
    showPlayer: false,
    setShowPlayer: () => {},
    showMiniplayer: false,
    setShowMiniplayer: () => {},
    nowPlaying: undefined,
    queue: [],
    play: async (index?: number | undefined) => {},
    pause: async () => {},
    resetQueue: async () => {},
    addToQueue: async ([]) => {},
    playbackState: undefined,
    progress: undefined,
});

export const PlayerProvider: ({ children }: { children: ReactNode }) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
    const { 
        showPlayer, 
        setShowPlayer, 
        showMiniplayer, 
        setShowMiniplayer, 
        nowPlaying,
        queue, 
        play,
        pause,
        resetQueue,
        addToQueue,
        playbackState,
        progress
    } = PlayerContextInitializer();

    return <PlayerContext.Provider value={{
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
        nowPlaying,
        queue,
        play,
        pause,
        resetQueue,
        addToQueue,
        playbackState,
        progress
    }}>
        { children }
    </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext);