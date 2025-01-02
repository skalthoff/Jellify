import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { handlePlayerError } from "./helpers/error-handlers";
import { usePlayerContext } from "../../player/provider";
import { Stack as HStack, YStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useApiClientContext } from "../jellyfin-api-provider";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { Text } from "../Global/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { playPauseButton } from "./helpers/buttons";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";

export default function Player({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }): React.JSX.Element {

    const { apiClient } = useApiClientContext();
    const { queue, playbackState, nowPlaying, play, pause } = usePlayerContext();

    return (
        <SafeAreaView>
            { nowPlaying && (
                <YStack alignItems="center">

                    <HStack alignItems="center">

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
                                width: 400,
                                height: 400,
                                borderRadius: 2
                            }}
                            />
                    </HStack>

                    <HStack>

                        <YStack>
                            <Text>{nowPlaying?.title ?? "Untitled Track"}</Text>
                            <Text 
                                bold
                                onPress={() => {
                                    navigation.goBack();
                                    navigation.navigate("Artist", {
                                        artistName: nowPlaying?.artist,
                                        artistId: nowPlaying?.ArtistId
                                    })
                                }}
                            >
                                {nowPlaying?.artist ?? "Unknown Artist"}</Text>
                        </YStack>

                        <HStack>
                            {/* Buttons for favorites, song menu go here */}

                        </HStack>

                    </HStack>

                    <HStack>
                        {/* playback progress goes here */}
                    </HStack>

                    <HStack>
                        {playPauseButton(playbackState, play, pause)}
                    </HStack>

                    
                    </YStack>
            )}
        </SafeAreaView>
    );
}