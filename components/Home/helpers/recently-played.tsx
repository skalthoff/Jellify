import React, { useEffect } from "react";
import { ScrollView, View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2 } from "../../Global/text";
import Avatar from "../../Global/avatar";

export default function RecentlyPlayed(): React.JSX.Element {

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
                            <Avatar itemId={recentlyPlayedTrack.AlbumId!} subheading={`${recentlyPlayedTrack.Artists?.join(", ")}`}>
                                {`${recentlyPlayedTrack.Name}`}
                            </Avatar>
                    )
                })}
            </ScrollView>
        </View>
    )
}