import React, { useEffect } from "react";
import { ScrollView } from "tamagui";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { useRecentlyPlayed } from "../../../api/queries/recently-played";

export default function RecentlyPlayed(): React.JSX.Element {

    const { apiClient, library } = useApiClientContext();

    const { data, isError, refetch } = useRecentlyPlayed(apiClient!, library!.musicLibraryId);

    useEffect(() => {
        refetch();
    }, [
        apiClient
    ]);

    useEffect(() => {
        console.log("Recently played", data);
    }, [
        data
    ])

    return (
        <ScrollView horizontal>

        </ScrollView>
    )
}