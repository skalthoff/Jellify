import React, { useEffect } from "react";
import { Avatar, ScrollView, Text } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { useRecentlyPlayedArtists } from "../../../api/queries/recently-played";
import { Stack } from "tamagui"
import { Colors } from "../../../enums/colors";

export default function RecentArtists(): React.JSX.Element {

    const { apiClient, library, server } = useApiClientContext();

    const { data } = useRecentlyPlayedArtists(apiClient!, library!.musicLibraryId);

    useEffect(() => {
        console.log("Recently played artists", data);
    }, [
        data
    ])

    return (
        <ScrollView horizontal>
            { data && data.map((recentArtist) => {
                return (
                    <Stack maxWidth={150} gap="$2">
                        <Avatar>
                            <Avatar.Image src={`${server!.url}/Items/${recentArtist.Id!}/Images/Primary`} />
                            <Avatar.Fallback backgroundColor={Colors.Primary}/>
                        </Avatar>
                        <Text>{recentArtist.Name}</Text>
                    </Stack>
                )
            })}
        </ScrollView>
    )
}