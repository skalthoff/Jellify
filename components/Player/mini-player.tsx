import React from "react";
import { Button, Spacer, Spinner, Text, XStack, YStack } from "tamagui";
import { State, useActiveTrack, usePlaybackState } from "react-native-track-player";
import { JellifyTrack } from "../../types/JellifyTrack";
import { usePlayerContext } from "../../player/provider";
import { BottomTabNavigationEventMap, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { pause, play, skipToNext } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/icon";

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const playbackState = usePlaybackState();

    const activeTrack = useActiveTrack() as JellifyTrack | undefined;

    const { setShowPlayer } = usePlayerContext();

    return (
        <BlurView>
            <XStack height={"$8"} onPress={() => navigation.navigate("Player")}>
                <YStack alignItems="flex-start">
                    <Text>{activeTrack?.title ?? "Nothing Playing"}</Text>
                </YStack>

                <Spacer />

                <Button onPress={() => {
                    pause()
                }}>
                </Button>
                    
                { playbackState.state === State.Playing && (
                    <Icon name="pause" />
                )}

                { playbackState.state === State.Paused && (
                    <Icon name="play" large onPress={() => play()} />
                )}

                { playbackState.state === State.Buffering || playbackState.state === State.Loading && (
                    <Spinner size="small" />
                )}

                <Icon 
                    large
                    name="fast-forward" 
                    onPress={() => skipToNext()} 
                />
            </XStack>
        </BlurView>
    )
}