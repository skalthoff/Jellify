import React, { useEffect } from "react";
import { Avatar, ScrollView, View, YStack } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Colors } from "../../../enums/colors";
import { useHomeContext } from "../provider";
import { H2, Text } from "../../helpers/text";

export default function RecentlyPlayed(): React.JSX.Element {

    const { server } = useApiClientContext();
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
                        <YStack 
                            height={200}
                            gap="$5">
                            <Avatar borderRadius={2}>
                                <Avatar.Image src={`${server!.url}/Items/${recentlyPlayedTrack.AlbumId}/Images/Primary`} />
                                <Avatar.Fallback backgroundColor={Colors.Primary}/>
                            </Avatar>
                            <Text>{`${recentlyPlayedTrack.Name}`}</Text>
                            <Text>{`${recentlyPlayedTrack.Artists?.join(", ")}`}</Text>
                        </YStack>
                    )
                })}
            </ScrollView>
        </View>
    )
}