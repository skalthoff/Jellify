import React, { useEffect } from "react";
import { Avatar, ScrollView, Text } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { useRecentlyPlayed } from "../../../api/queries/recently-played";
import { Stack } from "tamagui"

export default function RecentlyPlayed(): React.JSX.Element {

    const { apiClient, library } = useApiClientContext();

    const { data } = useRecentlyPlayed(apiClient!, library!.musicLibraryId);

    useEffect(() => {
        console.log("Recently played", data);
    }, [
        data
    ])

    return (
        <ScrollView horizontal>
            { data && data.map((recentlyPlayedTrack) => {
                <Stack>
                    <Text>{recentlyPlayedTrack.Name}</Text>
                </Stack>
            })}
        </ScrollView>
    )
}