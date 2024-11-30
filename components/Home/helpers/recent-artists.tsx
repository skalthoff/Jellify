import React, { useEffect } from "react";
import { View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2 } from "../../Global/text";
import { ProvidedHomeProps } from "../types";
import { FlatList } from "react-native";
import { Card } from "../../Global/card";

export default function RecentArtists({ navigation }: ProvidedHomeProps): React.JSX.Element {

    const { recentArtists } = useHomeContext();

    useEffect(() => {
        console.log("Recently played artists", recentArtists);
    }, [
        recentArtists
    ])

    return (
        <View>
            <H2>Recent Artists</H2>
            <FlatList horizontal
                data={recentArtists}
                renderItem={({ item: recentArtist}) => {

                    const artistBlurhashKey : string | undefined = 
                        recentArtist.ImageBlurHashes!.Primary 
                        ? Object.keys(recentArtist.ImageBlurHashes!.Primary)[0] 
                        : undefined;

                    const artistBlurhash : string | undefined = 
                        artistBlurhashKey 
                        ? recentArtist.ImageBlurHashes!.Primary![artistBlurhashKey!] 
                        : undefined;

                    return (
                        <Card 
                            artistName={recentArtist.Name!}
                            blurhash={artistBlurhash}
                            itemId={recentArtist.Id!}
                            onPress={() => {
                                navigation.navigate('Artist', 
                                    { 
                                        artistId: recentArtist.Id!, 
                                        artistName: recentArtist.Name ?? "Unknown Artist" 
                                    }
                                )}
                            }>
                            {recentArtist.Name ?? "Unknown Artist"}
                        </Card>
                    )
                }}
            />
        </View>
    )
}