import { usePlayerContext } from "../../player/provider";
import { Spacer, View, XStack, YStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useApiClientContext } from "../jellyfin-api-provider";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { Text } from "../Global/helpers/text";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { HorizontalSlider } from "../Global/helpers/slider";
import PlayPauseButton from "./helpers/buttons";
import { BlurView } from "@react-native-community/blur";
import React, { useEffect, useState } from "react";
import { skipToNext, skipToPrevious } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/helpers/icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";

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
            setProgressState(progress!.position)
    }, [
        progress
    ]);

    return (
        <View>
            { nowPlaying && (
            <>
                <YStack>

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

                    <XStack margin={20}>
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

                    <XStack justifyContent="center" marginVertical={20}>
                        {/* playback progress goes here */}
                        <HorizontalSlider 
                            value={progressState}
                            max={progress!.duration}
                            width={width / 1.1}
                            props={{
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

                    <XStack justifyContent="center">
                        <Icon
                            large
                            name="skip-previous"
                            onPress={() => skipToPrevious()}
                            />

                        <Spacer />

                        <PlayPauseButton />

                        <Spacer />

                        <Icon 
                            large
                            name="skip-next" 
                            onPress={() => skipToNext()}
                            />                    
                    </XStack>

                    
                </YStack>
            </>
            )}
        </View>
    );
}