import { createContext, ReactNode, SetStateAction, useContext, useState } from "react";
import { JellifyTrack } from "../types/JellifyTrack";
import { storage } from "../constants/storage";
import { MMKVStorageKeys } from "../enums/mmkv-storage-keys";
import { useActiveTrack, useProgress } from "react-native-track-player";
import { findPlayQueueIndexStart } from "./mutators/helpers";
import { add, remove, removeUpcomingTracks, setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";

interface PlayerContext {
    showPlayer: boolean;
    setShowPlayer: React.Dispatch<SetStateAction<boolean>>;
    showMiniplayer: boolean;
    setShowMiniplayer: React.Dispatch<SetStateAction<boolean>>;
    queue: JellifyTrack[];
    clearQueue: () => Promise<void>;
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

    const clearQueue = async () => {
        console.debug("Clearing queue")
        await removeUpcomingTracks();
        setQueue([]);
    }

    const addToQueue = async (tracks: JellifyTrack[]) => {
        console.debug(`Adding ${tracks.length} to queue`)
        let insertIndex = findPlayQueueIndexStart(queue);

        await add(tracks, insertIndex);

        let newQueue : JellifyTrack[] = [];
        tracks.forEach(track => {
            newQueue = _.cloneDeep(queue).splice(insertIndex, 0, track);
        });

        setQueue(newQueue)
    }

    return {
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
        queue,
        addToQueue,
        clearQueue,
        setPlayerState,
    }
}

export const PlayerContext = createContext<PlayerContext>({
    showPlayer: false,
    setShowPlayer: () => {},
    showMiniplayer: false,
    setShowMiniplayer: () => {},
    queue: [],
    clearQueue: async () => {},
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
        clearQueue,
        addToQueue,
        setPlayerState,
    } = PlayerContextInitializer();

    return <PlayerContext.Provider value={{
        showPlayer,
        setShowPlayer,
        showMiniplayer,
        setShowMiniplayer,
        queue,
        clearQueue,
        addToQueue,
        setPlayerState,
    }}>
        { children }
    </PlayerContext.Provider>
}

export const usePlayerContext = () => useContext(PlayerContext);