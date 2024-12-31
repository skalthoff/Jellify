import { Event, useActiveTrack, useTrackPlayerEvents } from "react-native-track-player";
import { handlePlayerError } from "./helpers/error-handlers";
import { usePlayerContext } from "../../player/provider";
import { JellifyTrack } from "../../types/JellifyTrack";
import { Stack, YStack } from "tamagui";
import { CachedImage } from "@georstat/react-native-image-cache";
import { useApiClientContext } from "../jellyfin-api-provider";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { Text } from "../Global/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";

/**
 * Events subscribed to within RNTP
 */
const playerEvents = [
    Event.PlaybackState,
    Event.PlaybackError
]

export default function Player(): React.JSX.Element {

    const { apiClient } = useApiClientContext();
    const { queue, setPlayerState, nowPlaying } = usePlayerContext();

    useTrackPlayerEvents(playerEvents, (event : any) => {
        playerEventCallback(event, setPlayerState)
    });

    return (
        <SafeAreaView>
            { nowPlaying && (
                <YStack alignItems="center">

                    <CachedImage
                        source={getImageApi(apiClient!)
                            .getItemImageUrlById(
                                nowPlaying!.AlbumId,
                                ImageType.Primary,
                                { ...queryConfig.playerArtwork }
                            )
                        }
                        imageStyle={{
                            width: 400,
                            height: 400,
                            borderRadius: 2
                        }}
                    />
                    <Stack justifyContent="space-between">

                        <Stack alignItems="flex-start" justifyContent="flex-start">
                            <Text>{nowPlaying?.title ?? "Untitled Track"}</Text>
                            <Text bold>{nowPlaying?.artist ?? "Unknown Artist"}</Text>
                        </Stack>

                    </Stack>
                    
                    </YStack>
            )}
        </SafeAreaView>
    );
}

function playerEventCallback(event: any, setPlayerState: React.Dispatch<React.SetStateAction<null>>) {
    if (event.type === Event.PlaybackError)
        handlePlayerError();

    if (event.type === Event.PlaybackState) {
        setPlayerState(event.state)
    }
}