import React, { useEffect } from "react";
import { Avatar, ScrollView, View, YStack } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Colors } from "../../../enums/colors";
import { useHomeContext } from "../provider";
import { H2, Text } from "../../helpers/text";
import Button from "../../helpers/button";
import { HomeStackParamList, ProvidedHomeProps } from "../types";
import { useNavigation } from "@react-navigation/native";

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
                        <Button onPress={() => navigation.navigate('Artist', { artistId: recentArtist.Id! })}>
                            <YStack 
                            gap="$4" 
                            alignContent="center"
                            justifyContent="center"
                            padding="$3"
                            width="$10"
                            >
                                <Avatar circular size="$10">
                                    <Avatar.Image src={`${server!.url}/Items/${recentArtist.Id!}/Images/Primary`} />
                                    <Avatar.Fallback backgroundColor={Colors.Primary}/>
                                </Avatar>
                                <Text alignCenter>{`${recentArtist!.Name}`}</Text>
                            </YStack>
                        </Button>
                    )
                })}
            </ScrollView>
        </View>
    )
}