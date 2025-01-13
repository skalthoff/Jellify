import { usePlayerContext } from "@/player/provider";
import React from "react";
import { Separator, View, XStack, YStack } from "tamagui";
import { Text } from "../helpers/text";
import { RunTimeTicks } from "../helpers/time-codes";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { Colors } from "@/enums/colors";

interface TrackProps {
    track: BaseItemDto;
    tracklist: BaseItemDto[];
    index: number;
    showArtwork?: boolean | undefined;
}

export default function Track({
    track,
    tracklist,
    index,
    showArtwork
} : {
    track: BaseItemDto,
    tracklist: BaseItemDto[],
    index: number,
    showArtwork?: boolean | undefined
}) : React.JSX.Element {

    const { nowPlaying, playNewQueue } = usePlayerContext();

    const isPlaying = nowPlaying?.ItemId === track.Id

    return (
        <View>
            <Separator />
            <XStack 
                flex={1}
                onPress={() => {
                    playNewQueue.mutate({
                        track,
                        index,
                        tracklist
                    });
                }}
                paddingVertical={"$3"}
                marginHorizontal={"$1"}
            >
                <XStack justifyContent="flex-start" flex={1}>
                    <Text color={isPlaying ? Colors.Primary : Colors.White}>
                        { track.IndexNumber?.toString() ?? "" }
                    </Text>
                </XStack>

                <YStack justifyContent="flex-start" flex={6}>
                    <Text 
                        color={isPlaying ? Colors.Primary : Colors.White}
                        lineBreakStrategyIOS="standard"
                        numberOfLines={1}
                    >
                        { track.Name ?? "Untitled Track" }
                    </Text>
                </YStack>

                <XStack alignContent="flex-end" flex={1}>
                    <RunTimeTicks>{ track.RunTimeTicks }</RunTimeTicks>
                </XStack>
            </XStack>
        </View>
    )
}