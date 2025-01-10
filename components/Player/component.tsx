import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { handlePlayerError } from "./helpers/error-handlers";
import { usePlayerContext } from "../../player/provider";
import { XStack, YStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useApiClientContext } from "../jellyfin-api-provider";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { Text } from "../Global/helpers/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { HorizontalSlider } from "../Global/helpers/slider";
import PlayPauseButton from "./helpers/buttons";

export default function Player({ navigation }: { navigation : NavigationHelpers<ParamListBase, BottomTabNavigationEventMap> }): React.JSX.Element {

    const { apiClient } = useApiClientContext();
    const { queue, playbackState, nowPlaying, useTogglePlayback, progress } = usePlayerContext();

    return (
        <SafeAreaView>
            { nowPlaying && (
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
                                width: 400,
                                height: 400,
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

                    <XStack justifyContent="center" marginTop={10}>
                        {/* playback progress goes here */}
                        <HorizontalSlider 
                            value={progress!.position}
                            max={progress!.duration}
                            width={400}
                        />

                    </XStack>

                    <XStack justifyContent="center">
                        <PlayPauseButton />
                    </XStack>

                    
                </YStack>
            )}
        </SafeAreaView>
    );
}