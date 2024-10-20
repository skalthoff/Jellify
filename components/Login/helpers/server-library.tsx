import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Button, H2, Select, Text, View } from "tamagui";
import { JellifyLibrary } from "../../../types/JellifyLibrary";
import { useLibraries } from "../../../api/queries/libraries";
import { client } from "../../../api/client";

export default function ServerLibrary(): React.JSX.Element {

    const [musicLibrary, setMusicLibrary] = useState<JellifyLibrary | undefined>(undefined);

    const [musicLibraryName, setMusicLibraryName] = useState<string>("")

    const { apiClient, server, setApiClient, setChangeUser, setUsername } = useApiClientContext();

    const { data: musicLibraries, isPending: musicLibrariesPending } = useLibraries(apiClient!);


    const clearUser = useMutation({
        mutationFn: async () => {
            setUsername(undefined)

            // Reset API client so that we don't attempt to auth as a user
            setApiClient(client.createApi(server!.url))
            return Promise.resolve();
        }
    });


    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <H2 marginVertical={30}>Select Music Library</H2>

            <Button
                onPress={() => {
                    clearUser.mutate();
                }}
                >Switch User</Button>

            <Select value={musicLibraryName}></Select>
        </View>
    )
}