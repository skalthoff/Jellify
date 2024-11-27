import React, { useEffect } from "react";
import { Avatar, Button, ScrollView, View, YStack } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Colors } from "../../../enums/colors";
import { useHomeContext } from "../provider";
import { H2, Text } from "../../helpers/text";
import { ProvidedHomeProps } from "../types";

export default function RecentArtists({ navigation }: ProvidedHomeProps): React.JSX.Element {

    const { server } = useApiClientContext();
    const { recentArtists } = useHomeContext();

    useEffect(() => {
        console.log("Recently played artists", recentArtists);
    }, [
        recentArtists
    ])

    return (
        <View>
            <H2>Recent Artists</H2>
            <ScrollView horizontal>
                { recentArtists && recentArtists.map((recentArtist) => {
                    return (
                        <Button onPress={() => navigation.navigate('Artist', { artistId: recentArtist.Id!, artistName: recentArtist.Name ?? "Unknown Artist" })}>
                            <YStack 
                            gap="$4" 
                            alignItems="center"
                            width="$5"
                            minHeight="$20"
                            >
                                <Avatar circular size="$10">
                                    <Avatar.Image src={`${server!.url}/Items/${recentArtist.Id!}/Images/Primary`} />
                                    <Avatar.Fallback backgroundColor={Colors.Primary}/>
                                </Avatar>
                                <Text>{`${recentArtist!.Name}`}</Text>
                            </YStack>
                        </Button>
                    )
                })}
            </ScrollView>
        </View>
    )
}