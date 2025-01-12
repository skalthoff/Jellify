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
import React from "react";
import { skipToNext, skipToPrevious } from "react-native-track-player/lib/src/trackPlayer";
import Icon from "../Global/helpers/icon";

export default function Player({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }): React.JSX.Element {

    const { apiClient } = useApiClientContext();
    const { nowPlaying, progress, useSeekTo } = usePlayerContext();

    const { width, height } = useSafeAreaFrame();

    return (
        <View>
            { nowPlaying && (
            <>
                {/* Blurred album artwork background */}
                <CachedImage
                    source={getImageApi(apiClient!)
                        .getItemImageUrlById(
                            nowPlaying!.AlbumId,
                            ImageType.Primary,
                            { ...queryConfig.playerArtwork }
                        )
                    }
                    imageStyle={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: -99,
                        width: height,
                        height: height,
                        resizeMode: "cover",
                        borderRadius: 2
                    }}
                />
                <BlurView style={{ 
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute", 
                    zIndex: -98 
                    }}
                />

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

                    <XStack margin={10}>
                        <YStack justifyContent="flex-start" flex={4}>
                            <Text fontSize={"$6"}>{nowPlaying?.title ?? "Untitled Track"}</Text>
                            <Text 
                                fontSize={"$6"}
                                bold
                                onPress={() => {
                                    navigation.navigate("Artist", {
                                        artistName: nowPlaying.artist,
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

                    <XStack justifyContent="center" marginHorizontal={20}>
                        {/* playback progress goes here */}
                        <HorizontalSlider 
                            value={progress!.position}
                            max={progress!.duration}
                            width={width / 1.1}
                            props={{
                                onValueChange: (value) => {
                                    const position = value[0];

                                    useSeekTo.mutate(position);
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