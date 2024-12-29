import React, { useEffect } from "react";
import { View } from "tamagui";
import { useHomeContext } from "../provider";
import { H2 } from "../../Global/text";
import { ProvidedHomeProps } from "../types";
import { FlatList } from "react-native";
import { Card } from "../../Global/card";
import { getPrimaryBlurhashFromDto } from "../../../helpers/blurhash";

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
                    return (
                        <Card 
                            artistName={recentArtist.Name!}
                            blurhash={getPrimaryBlurhashFromDto(recentArtist)}
                            itemId={recentArtist.Id!}
                            marginRight={20}
                            caption={recentArtist.Name ?? "Unknown Artist"}
                            onPress={() => {
                                navigation.navigate('Artist', 
                                    { 
                                        artistId: recentArtist.Id!, 
                                        artistName: recentArtist.Name ?? "Unknown Artist" 
                                    }
                                )}
                            }>
                        </Card>
                    )
                }}
            />
        </View>
    )
}