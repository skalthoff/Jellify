import React, { useEffect } from "react";
import { H5, ScrollView, Text, View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2 } from "../../Global/text";
import Avatar from "../../Global/avatar";
import { Card } from "../../Global/card";

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
                        <Card
                            caption={
                                <>
                                    <H5>{`${recentlyPlayedTrack.Name}`}</H5>
                                    <Text>`${recentlyPlayedTrack.Artists?.join(", ")}`</Text>
                                </>
                            }
                            cornered
                            itemId={recentlyPlayedTrack.AlbumId!}
                            marginRight={20}
                        >
                                
                        </Card>
                    )
                })}
            </ScrollView>
        </View>
    )
}