import React, { useEffect } from "react";
import { H5, ScrollView, Text, View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2 } from "../../Global/text";
import { Card } from "../../Global/card";
import { play } from "react-native-track-player/lib/src/trackPlayer";
import { mapDtoToTrack } from "../../../helpers/mappings";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { usePlayerContext } from "../../../player/provider";

export default function RecentlyPlayed(): React.JSX.Element {

    const { clearQueue, addToQueue } = usePlayerContext();
    const { apiClient } = useApiClientContext();
    const { recentTracks } = useHomeContext();

    useEffect(() => {
        console.log("Recently played", recentTracks);
    }, [
        recentTracks
    ])

    return (
        <View>
            <H2>Play it again</H2>
            <ScrollView horizontal>
                { recentTracks && recentTracks.map((recentlyPlayedTrack) => {
                    return (
                        <Card
                            caption={
                                <>
                                    <H5>{`${recentlyPlayedTrack.Name}`}</H5>
                                    <Text>{`${recentlyPlayedTrack.Artists?.join(", ")}`}</Text>
                                </>
                            }
                            cornered
                            itemId={recentlyPlayedTrack.AlbumId!}
                            marginRight={20}
                            onPress={async () => {
                                await clearQueue();
                                await addToQueue([mapDtoToTrack(apiClient!, recentlyPlayedTrack)])
                                play();
                            }}
                        >
                                
                        </Card>
                    )
                })}
            </ScrollView>
        </View>
    )
}