import React from "react";
import { Button, Spacer, Spinner, Stack, useTheme, XStack, YStack } from "tamagui";
import { State, useActiveTrack, usePlaybackState } from "react-native-track-player";
import { JellifyTrack } from "../../types/JellifyTrack";
import { usePlayerContext } from "../../player/provider";
import { BottomTabNavigationEventMap, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { pause, play, skipToNext } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/icon";
import { Text } from "../Global/text";
import { Colors } from "../../enums/colors";

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const playbackState = usePlaybackState();

    const theme = useTheme();

    const activeTrack = useActiveTrack() as JellifyTrack | undefined;

    return (
        <BlurView>
            <XStack height={"$8"} onPress={() => navigation.navigate("Player")}>
                <YStack alignItems="flex-start" flex={3}>
                    <Text bold>{activeTrack?.title ?? "Nothing Playing"}</Text>
                    <Text>{activeTrack?.artist ?? ""}</Text>
                </YStack>

                <Spacer />
                
                <XStack alignItems="flex-end" flex={1}>
                    { playbackState.state === State.Playing && (
                        <Icon name="pause" large onPress={() => pause()} />
                    )}

                    { playbackState.state === State.Paused && (
                        <Icon name="play" large onPress={() => play()} />
                    )}

                    { playbackState.state === State.Buffering || playbackState.state === State.Loading && (
                        <Spinner size="small" color={Colors.Primary}/>
                    )}

                    <Icon 
                        large
                        name="fast-forward" 
                        onPress={() => skipToNext()} 
                        />
                </XStack>
            </XStack>
        </BlurView>
    )
}