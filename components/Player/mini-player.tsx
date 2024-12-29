import React from "react";
import { Button, Spacer, Spinner, Stack, useTheme, XStack, YStack } from "tamagui";
import { State, useActiveTrack, usePlaybackState } from "react-native-track-player";
import { JellifyTrack } from "../../types/JellifyTrack";
import { usePlayerContext } from "../../player/provider";
import { BottomTabNavigationEventMap, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
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

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const playbackState = usePlaybackState();

    const activeTrack = useActiveTrack() as JellifyTrack | undefined;

    const { play, pause } = usePlayerContext();

    const { apiClient } = useApiClientContext();

    return (
        <BlurView>
            { activeTrack && (

                <XStack height={"$8"} onPress={() => navigation.navigate("Player")}>

                    <CachedImage
                        source={getImageApi(apiClient!)
                            .getItemImageUrlById(
                                activeTrack!.albumId,
                                ImageType.Primary,
                                { ...queryConfig.miniplayerArtwork }
                            )
                        }
                        imageStyle={{
                            ...queryConfig.miniplayerArtwork,
                            borderRadius: 2
                        }}
                    />

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
                            />
                    </XStack>
                </XStack>
            )}
        </BlurView>
    )
}