import { useState } from "react";
import { Text, View } from "react-native";
import { Event, useActiveTrack, useProgress, useTrackPlayerEvents } from "react-native-track-player";
import { handlePlayerError } from "./helpers/error-handlers";
import { usePlayerContext } from "../../player/provider";

/**
 * Events subscribed to within RNTP
 */
const playerEvents = [
    Event.PlaybackState,
    Event.PlaybackError
]

export default function Player(): React.JSX.Element {

    const { activeTrack, queue, setPlayerState } = usePlayerContext();

    useTrackPlayerEvents(playerEvents, (event : any) => {
        playerEventCallback(event, setPlayerState)
    });


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{activeTrack?.title ?? "Nothing playing"}</Text>
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