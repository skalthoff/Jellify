import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Select, View } from "tamagui";
import { JellifyLibrary } from "../../../types/JellifyLibrary";
import { useLibraries } from "../../../api/queries/libraries";
import { mutateServerCredentials } from "../../../api/mutators/functions/storage";
import { useAuthenticationContext } from "../provider";
import { Heading } from "../../helpers/text";
import Button from "../../helpers/button";

export default function ServerLibrary(): React.JSX.Element {

    const [musicLibrary, setMusicLibrary] = useState<JellifyLibrary | undefined>(undefined);

    const { setUsername, libraryName, setLibraryName, libraryId, setLibraryId } = useAuthenticationContext();

    const { apiClient, server, setApiClient, setUsername: setClientUsername } = useApiClientContext();

    const { data: musicLibraries, isPending: musicLibrariesPending } = useLibraries(apiClient!);


    const clearUser = useMutation({
        mutationFn: async () => {

            setUsername(undefined);
            setClientUsername(undefined);

            return Promise.resolve();
        }
    });

    const serverCredentials = useMutation({
        mutationFn: mutateServerCredentials
    });


    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <Heading>Select Music Library</Heading>

            <Button
                onPress={() => {
                    serverCredentials.mutate(undefined);
                    clearUser.mutate();
                }}
            >
                Switch User
            </Button>

            <Select value={libraryName}></Select>
        </View>
    )
}