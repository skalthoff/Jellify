import React, { useEffect } from "react";
import { Avatar, ScrollView, YStack } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Colors } from "../../../enums/colors";
import { useHomeContext } from "../provider";
import { Text } from "../../helpers/text";

export default function RecentArtists(): React.JSX.Element {

    const { server } = useApiClientContext();
    const { recentArtists } = useHomeContext();

    useEffect(() => {
        console.log("Recently played artists", recentArtists);
    }, [
        recentArtists
    ])

    return (
        <ScrollView horizontal>
            { recentArtists && recentArtists.map((recentArtist) => {
                return (
                    <YStack 
                        maxWidth={300} 
                        gap="$2" 
                        alignContent="center"
                    >
                        <Avatar circular>
                            <Avatar.Image src={`${server!.url}/Items/${recentArtist.Id!}/Images/Primary`} />
                            <Avatar.Fallback backgroundColor={Colors.Primary}/>
                        </Avatar>
                        <Text>{`${recentArtist!.Name}`}</Text>
                    </YStack>
                )
            })}
        </ScrollView>
    )
}