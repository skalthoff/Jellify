import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { JellifyTrack } from "../types/JellifyTrack";
import { storage } from "../constants/storage";
import { MMKVStorageKeys } from "../enums/mmkv-storage-keys";
import { findPlayQueueIndexStart } from "./helpers/index";
import TrackPlayer, { Event, State, usePlaybackState, useTrackPlayerEvents } from "react-native-track-player";
import _ from "lodash";
import { buildNewQueue } from "./helpers/queue";
import { useApiClientContext } from "../components/jellyfin-api-provider";
import { getPlaystateApi } from "@jellyfin/sdk/lib/utils/api";

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
    setPlayerState: React.Dispatch<SetStateAction<null>>;
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
        
        const activeTrack = await TrackPlayer.getActiveTrack() as JellifyTrack;
        playStateApi.reportPlaybackStopped({
            playbackStopInfo: {
                SessionId: sessionId,
                ItemId: activeTrack.ItemId
            }
        })
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
    TrackPlayer.setupPlayer();

    useTrackPlayerEvents([
        Event.PlaybackActiveTrackChanged,
        Event.RemotePlay,
        Event.RemotePause
    ], async (event) => {

        switch (event.type) {
            case (Event.RemotePlay) : {
                play();
            }

            case (Event.RemotePause) : {
                pause();
            }

            case (Event.PlaybackActiveTrackChanged) : {
                const activeTrack = await TrackPlayer.getActiveTrack() as JellifyTrack;

                setNowPlaying(activeTrack);        
            }
        }
    })

    const { state: playbackState } = usePlaybackState()

    const [playerState, setPlayerState] = useState(null);

    useEffect(() => {

        if (!!!playbackState)
            return

        switch (playbackState) {

        }
    }, [
        playbackState
    ])

    useEffect(() => {
        if (!showMiniplayer)
            setNowPlaying(undefined);
    }, [
        showMiniplayer
    ])
    //#endregion RNTP Setup

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
        setPlayerState,
    }
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
    setPlayerState: () => {},
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
        setPlayerState,
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
        setPlayerState,
    }}>
        { children }
    </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext);