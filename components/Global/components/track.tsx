import { usePlayerContext } from "@/player/provider";
import React from "react";
import { Separator, useTheme, View, XStack } from "tamagui";
import { Text } from "../helpers/text";
import RunTimeTicks from "../helpers/runtimeticks";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { mapDtoToTrack } from "@/helpers/mappings";
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

    const { apiClient, sessionId } = useApiClientContext();

    const { nowPlaying, resetQueue, addToQueue, play } = usePlayerContext();

    const theme = useTheme();

    let isPlaying = nowPlaying?.ItemId === track.Id

    return (
        <View>
            <Separator />
            <XStack 
                flex={1}
                onPress={async () => {
                    await resetQueue(false)
                    await addToQueue(tracklist.map((track) => mapDtoToTrack(apiClient!, sessionId, track)));
                    play(index);
                }}
                paddingVertical={"$2"}
                paddingHorizontal={"$1"}
            >
                <XStack justifyContent="center" flex={1}>
                    <Text>{ track.IndexNumber?.toString() ?? "" }</Text>
                </XStack>

                <XStack alignContent="flex-start" flex={8}>
                    <Text color={isPlaying ? Colors.Primary : Colors.White}>{ track.Name ?? "Untitled Track" }</Text>
                </XStack>

                <XStack alignContent="flex-end" flex={1}>
                    <RunTimeTicks>{ track.RunTimeTicks }</RunTimeTicks>
                </XStack>
            </XStack>
        </View>
    )
}