import { useState } from "react";
import { Text, View } from "react-native";
import { Event, useActiveTrack, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import { handlePlayerError } from "./helpers/error-handlers";

/**
 * Events subscribed to within RNTP
 */
const playerEvents = [
    Event.PlaybackState,
    Event.PlaybackError
]

export default function Player(): React.JSX.Element {

    //#region RNTP Setup
    const [playerState, setPlayerState] = useState(null);

    useTrackPlayerEvents(playerEvents, (event : any) => {
        playerEventCallback(event, setPlayerState)
    });

    const { position, buffered, duration } = useProgress()

    let activeTrack = useActiveTrack()!;
    //#endregion RNTP Setup

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{activeTrack.title ?? "Nothing playing"}</Text>
        </View>
    );
}

function playerEventCallback(event: any, setPlayerState: React.Dispatch<React.SetStateAction<null>>) {
    if (event.type === Event.PlaybackError)
        handlePlayerError();

    if (event.type === Event.PlaybackState) {
        setPlayerState(event.state)
    }
}