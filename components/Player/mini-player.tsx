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

export function Miniplayer({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }) : React.JSX.Element {

    const playbackState = usePlaybackState();

    const { nowPlaying, play, pause } = usePlayerContext();

    const { apiClient } = useApiClientContext();

    return (
        <BlurView>
            { nowPlaying && (

                <XStack 
                    alignContent="center"
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
                                marginHorizontal: 0,
                                marginVertical: 'auto',
                                borderRadius: 2,
                            }}
                        />

                    </YStack>


                    <YStack alignContent="flex-start" flex={3}>
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
                    
                    <XStack flex={1}>
                        { renderPlayPause(playbackState.state, play, pause) }

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

function renderPlayPause(playbackState: State | undefined, play: Function, pause: Function) {

    let button : React.JSX.Element;

    switch (playbackState) {
        case (State.Playing) : {
            button = <Icon name="pause" large onPress={() => pause()} />
        }
    
        case (State.Buffering) :
        case (State.Loading) : {
            button = <Spinner size="small" color={Colors.Primary}/>
        }
        
        default : {
            button = <Icon name="play" large onPress={() => play()} />
        }
    }

    return button;
}