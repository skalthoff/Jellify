import React from "react";
import { Text, View, XStack, YStack } from "tamagui";
import { usePlayerContext } from "../../player/provider";

export function Miniplayer() : React.JSX.Element {

    const { activeTrack } = usePlayerContext();

    return (
        <View backgroundColor={"$colorTransparent"}>
            <XStack>
                <YStack>
                    <Text>{activeTrack?.title ?? "Nothing Playing"}</Text>
                </YStack>
            </XStack>
        </View>
    )
}