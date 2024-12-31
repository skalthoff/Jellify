import React, {  } from "react";
import { Spacer, Spinner, XStack, YStack } from "tamagui";
import { State, usePlaybackState } from "react-native-track-player";
import { usePlayerContext } from "../../player/provider";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import Icon from "../Global/icon";
import { Text } from "../Global/text";
import { Colors } from "../../enums/colors";
import { CachedImage } from "@georstat/react-native-image-cache";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { queryConfig } from "../../api/queries/query.config";
import { useApiClientContext } from "../jellyfin-api-provider";
import { Marquee } from "@animatereactnative/marquee";

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const playbackState = usePlaybackState();

    const { nowPlaying, play, pause } = usePlayerContext();

    const { apiClient } = useApiClientContext();

    return (
        <BlurView>
            { nowPlaying && (

                <XStack 
                    alignContent="center"
                    height={"$6"} 
                    onPress={() => navigation.navigate("Player")}
                >
                    <YStack alignContent="center" flex={1}>
                        <CachedImage
                            source={getImageApi(apiClient!)
                                .getItemImageUrlById(
                                    nowPlaying!.AlbumId,
                                    ImageType.Primary,
                                    { ...queryConfig.images }
                                )
                            }
                            imageStyle={{
                                width: 75,
                                height: 75,
                                borderRadius: 2,
                            }}
                        />

                    </YStack>


                    <YStack alignContent="flex-start" flex={3}>
                        <Marquee spacing={20} speed={1}>
                            <Text bold>{nowPlaying?.title ?? "Nothing Playing"}</Text>
                        </Marquee>

                        <Marquee spacing={20} speed={1}>
                            <Text>{nowPlaying?.artist ?? ""}</Text>
                        </Marquee>
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
                            />
                    </XStack>
                </XStack>
            )}
        </BlurView>
    )
}