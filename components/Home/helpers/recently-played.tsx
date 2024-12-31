import React, { useEffect } from "react";
import { H5, ScrollView, View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2, Text } from "../../Global/text";
import { Card } from "../../Global/card";
import { mapDtoToTrack } from "../../../helpers/mappings";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { usePlayerContext } from "../../../player/provider";

export default function RecentlyPlayed(): React.JSX.Element {

    const { addToQueue, resetQueue, play } = usePlayerContext();
    const { apiClient, sessionId } = useApiClientContext();
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
                { recentTracks && recentTracks.map((recentlyPlayedTrack, index) => {
                    return (
                        <Card
                            caption={recentlyPlayedTrack.Name}
                            subCaption={`${recentlyPlayedTrack.Artists?.join(", ")}`}
                            cornered
                            width={150}
                            itemId={recentlyPlayedTrack.AlbumId!}
                            marginRight={20}
                            onPress={async () => {
                                await resetQueue(false);
                                await addToQueue(recentTracks.map((track) => mapDtoToTrack(apiClient!, sessionId, track)));
                                play(index);
                            }}
                        />                                
                    )
                })}
            </ScrollView>
        </View>
    )
}