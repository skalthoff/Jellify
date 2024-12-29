import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { JellifyTrack } from "../types/JellifyTrack";
import { storage } from "../constants/storage";
import { MMKVStorageKeys } from "../enums/mmkv-storage-keys";
import { findPlayQueueIndexStart } from "./helpers";
import { add, reset, play as rntpPlay, pause as rntpPause, skipToNext, skipToPrevious, setupPlayer, getActiveTrack } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { buildNewQueue } from "./helpers/queue";
import { useApiClientContext } from "../components/jellyfin-api-provider";
import { getPlaystateApi } from "@jellyfin/sdk/lib/utils/api";

interface PlayerContext {
    showPlayer: boolean;
    setShowPlayer: React.Dispatch<SetStateAction<boolean>>;
    showMiniplayer: boolean;
    setShowMiniplayer: React.Dispatch<SetStateAction<boolean>>;
    queue: JellifyTrack[];
    play: () => Promise<void>,
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
    const [queue, setQueue] = useState<JellifyTrack[]>(queueJson ? JSON.parse(queueJson) : []);
    //#endregion State

    //#region RNTP Setup
    setupPlayer().then(() => console.debug("Player setup successfully"));

    const [playerState, setPlayerState] = useState(null);
    //#endregion RNTP Setup

    //#region Functions
    const play = async () => {
        rntpPlay();

        const activeTrack = await getActiveTrack() as JellifyTrack;
        playStateApi.reportPlaybackStart({
            playbackStartInfo: {
                SessionId: sessionId,
                ItemId: activeTrack.ItemId
            }
        })
    }

    const pause = async () => {
        rntpPause();

        const activeTrack = await getActiveTrack() as JellifyTrack;
        playStateApi.reportPlaybackStopped({
            playbackStopInfo: {
                SessionId: sessionId,
                ItemId: activeTrack.ItemId
            }
        })
    }

    const resetQueue = async (hideMiniplayer: boolean | undefined) => {
        console.debug("Clearing queue")
        await reset();
        setQueue([]);

        setShowMiniplayer(!hideMiniplayer)
    }

    const addToQueue = async (tracks: JellifyTrack[]) => {
        let insertIndex = findPlayQueueIndexStart(queue);
        console.debug(`Adding ${tracks.length} to queue at index ${insertIndex}`)

        await add(tracks, insertIndex);

        setQueue(buildNewQueue(queue, tracks, insertIndex))

        setShowMiniplayer(true);
    }
    //#endregion Functions

    return {
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
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
    queue: [],
    play: async () => {},
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