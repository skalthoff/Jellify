import { usePlayerContext } from "../../player/provider";
import { Spacer, View, XStack, YStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useApiClientContext } from "../jellyfin-api-provider";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { H5, Text } from "../Global/helpers/text";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { HorizontalSlider } from "../Global/helpers/slider";
import PlayPauseButton from "./helpers/buttons";
import React, { useEffect, useState } from "react";
import { seekBy, skipToNext, skipToPrevious } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/helpers/icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { RunTimeSeconds } from "../Global/helpers/time-codes";

export default function Player({ navigation }: { navigation: NativeStackNavigationProp<StackParamList>}): React.JSX.Element {

    
    const { apiClient } = useApiClientContext();
    const { nowPlaying, progress, useSeekTo } = usePlayerContext();
    
    const [seeking, setSeeking] = useState<boolean>(false);
    const [progressState, setProgressState] = useState<number>(progress!.position);

    const { width, height } = useSafeAreaFrame();

    // Prevent gesture event to close player if we're seeking
    useEffect(() => {
        navigation.setOptions({ gestureEnabled: !seeking });
    }, [
        navigation,
        seeking
    ])

    useEffect(() => {
        if (!seeking)
            setProgressState(Math.floor(progress!.position))
    }, [
        progress
    ]);

    return (
        <SafeAreaView edges={["right", "left"]}>
            { nowPlaying && (
            <>
                <YStack>

                    <YStack alignItems="center">
                        <Text>Playing from</Text>
                        <H5>THING</H5>
                    </YStack>

                    <XStack justifyContent="center">
                        <CachedImage
                            source={getImageApi(apiClient!)
                                .getItemImageUrlById(
                                    nowPlaying!.AlbumId,
                                    ImageType.Primary,
                                    { ...queryConfig.playerArtwork }
                                )
                            }
                            imageStyle={{
                                position: "relative",
                                alignSelf: "center",
                                width: width / 1.1,
                                height: width / 1.1,
                                borderRadius: 2
                            }}
                            />
                    </XStack>

                    <XStack marginHorizontal={20} paddingVertical={5}>
                        <YStack justifyContent="flex-start" flex={4}>
                            <Text fontSize={"$6"}>{nowPlaying?.title ?? "Untitled Track"}</Text>
                            <Text 
                                fontSize={"$6"}
                                bold
                                onPress={() => {
                                    navigation.goBack(); // Dismiss player modal
                                    navigation.push("Artist", {
                                        artistName: nowPlaying.artist!,
                                        artistId: nowPlaying.ArtistId
                                    })
                                }}
                            >
                                {nowPlaying.artist ?? "Unknown Artist"}</Text>
                        </YStack>

                        <XStack alignItems="center" flex={1}>
                            {/* Buttons for favorites, song menu go here */}

                        </XStack>
                    </XStack>

                    <XStack justifyContent="center" marginTop={"$5"}>
                        {/* playback progress goes here */}
                        <HorizontalSlider 
                            value={progressState}
                            max={progress!.duration}
                            width={width / 1.1}
                            props={{
                                // If user swipes off of the slider we should seek to the spot
                                onPressOut: (event) => {
                                    useSeekTo.mutate(progressState);
                                    setSeeking(false);
                                },
                                onSlideStart: (event, value) => {
                                    setSeeking(true);
                                },
                                onSlideMove: (event, value) => {
                                    setProgressState(value);
                                },
                                onSlideEnd: (event, value) => {
                                    const position = value;

                                    useSeekTo.mutate(position);
                                    setSeeking(false);
                                }
                            }}
                            />

                    </XStack>

                    <XStack marginHorizontal={20} marginTop={"$4"} marginBottom={"$7"}>
                        <XStack flex={1} alignContent="flex-start">
                            <RunTimeSeconds>{progressState}</RunTimeSeconds>
                        </XStack>

                        <XStack flex={1} alignContent="flex-end">
                            <RunTimeSeconds>{progress!.duration}</RunTimeSeconds>
                        </XStack>
                    </XStack>

                    <XStack justifyContent="space-evenly" marginVertical={"$7"}>
                        <Icon
                            large
                            name="rewind-15"
                            onPress={() => seekBy(-15)}
                        />
                        
                        <Icon
                            large
                            name="skip-previous"
                            onPress={() => skipToPrevious()}
                        />

                        <PlayPauseButton />

                        <Icon 
                            large
                            name="skip-next" 
                            onPress={() => skipToNext()}
                        />    

                        <Icon
                            large
                            name="fast-forward-15"
                            onPress={() => seekBy(15)}  
                        />              
                    </XStack>

                    
                </YStack>
            </>
            )}
        </SafeAreaView>
    );
}