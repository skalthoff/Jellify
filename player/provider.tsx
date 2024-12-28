import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { JellifyTrack } from "../types/JellifyTrack";
import { storage } from "../constants/storage";
import { MMKVStorageKeys } from "../enums/mmkv-storage-keys";
import { findPlayQueueIndexStart } from "./helpers";
import { add, reset, setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { buildNewQueue } from "./helpers/queue";

interface PlayerContext {
    showPlayer: boolean;
    setShowPlayer: React.Dispatch<SetStateAction<boolean>>;
    showMiniplayer: boolean;
    setShowMiniplayer: React.Dispatch<SetStateAction<boolean>>;
    queue: JellifyTrack[];
    resetQueue: (hideMiniplayer : boolean | undefined) => Promise<void>;
    addToQueue: (tracks: JellifyTrack[]) => Promise<void>;
    setPlayerState: React.Dispatch<SetStateAction<null>>;
}

const PlayerContextInitializer = () => {

    const queueJson = storage.getString(MMKVStorageKeys.PlayQueue);
    
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [showMiniplayer, setShowMiniplayer] = useState<boolean>(false);
    const [queue, setQueue] = useState<JellifyTrack[]>(queueJson ? JSON.parse(queueJson) : []);

    //#region RNTP Setup
    setupPlayer().then(() => console.debug("Player setup successfully"));

    const [playerState, setPlayerState] = useState(null);
    //#endregion RNTP Setup

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

    return {
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
        queue,
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
        resetQueue,
        addToQueue,
        setPlayerState,
    }}>
        { children }
    </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext);