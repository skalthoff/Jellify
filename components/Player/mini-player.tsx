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
import TextTicker from 'react-native-text-ticker';
import { playPauseButton } from "./helpers/buttons";

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const { nowPlaying, playbackState, play, pause } = usePlayerContext();

    const { apiClient } = useApiClientContext();

    return (
        <BlurView>
            { nowPlaying && (

                <XStack 
                    alignItems="center"
                    margin={0}
                    padding={0}
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
                                width: 60,
                                height: 60,
                                marginRight: 2,
                                marginVertical: 'auto',
                                borderRadius: 2,
                            }}
                        />

                    </YStack>


                    <YStack alignContent="flex-start" flex={4}>
                        <TextTicker 
                            duration={3000}
                            loop
                            repeatSpacer={20} 
                            marqueeDelay={1000}
                        >
                            <Text bold>{nowPlaying?.title ?? "Nothing Playing"}</Text>
                        </TextTicker>

                        <TextTicker 
                            duration={3000}
                            loop
                            repeatSpacer={20}
                            marqueeDelay={1000} 
                        >
                            <Text>{nowPlaying?.artist ?? ""}</Text>
                        </TextTicker>
                    </YStack>
                    
                    <XStack flex={2}>
                        { playPauseButton(playbackState, play, pause) }

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