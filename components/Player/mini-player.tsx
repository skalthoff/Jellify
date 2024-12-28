import React from "react";
import { Button, Spacer, Text, XStack, YStack } from "tamagui";
import { useActiveTrack } from "react-native-track-player";
import { JellifyTrack } from "../../types/JellifyTrack";
import { usePlayerContext } from "../../player/provider";
import { BottomTabNavigationEventMap, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { pause, skipToNext } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/icon";

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

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
                    <Icon name="pause" />
                </Button>

                <Button onPress={() => skipToNext()}>
                    <Icon name="fast-forward" />
                </Button>
            </XStack>
        </BlurView>
    )
}