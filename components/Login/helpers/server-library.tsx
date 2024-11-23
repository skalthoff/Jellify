import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { RadioGroup, Text, ToggleGroup, View, YStack } from "tamagui";
import { JellifyLibrary } from "../../../types/JellifyLibrary";
import { useAuthenticationContext } from "../provider";
import { Heading, Label } from "../../helpers/text";
import Button from "../../helpers/button";
import _ from "lodash";
import { Api } from "@jellyfin/sdk";
import { fetchMusicLibraries, fetchPlaylistLibrary } from "../../../api/libraries";
import { QueryKeys } from "../../../enums/query-keys";
import { ActivityIndicator } from "react-native";
import { RadioGroupItemWithLabel } from "../../helpers/radio-group-item-with-label";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";

export default function ServerLibrary(): React.JSX.Element {

    const { libraryId, setLibraryId } = useAuthenticationContext();
    const { apiClient, setAccessToken, setLibrary } = useApiClientContext();
    
    const useMusicLibraries = (api: Api) => useQuery({
        queryKey: [QueryKeys.Libraries, api],
        queryFn: async ({ queryKey }) => await fetchMusicLibraries(queryKey[1] as Api)
    });

    const usePlaylistLibrary = (api: Api) => useQuery({
        queryKey: [QueryKeys.Playlist, api],
        queryFn: async ({ queryKey }) => await fetchPlaylistLibrary(queryKey[1] as Api)
    })
    
    const { data : libraries, isError, isPending, refetch: refetchMusicLibraries } = useMusicLibraries(apiClient!);
    const { data : playlistLibrary, refetch: refetchPlaylistLibrary } = usePlaylistLibrary(apiClient!);

    useEffect(() => {
        refetchMusicLibraries();
        refetchPlaylistLibrary();
    }, [
        apiClient
    ])

    useEffect(() => {
        console.log(libraries)
    }, [
        libraries
    ])

    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <Heading>Select Music Library</Heading>

            { isPending ? (
                <ActivityIndicator />
            ) : (
                <ToggleGroup
                    orientation="vertical"
                    type="single"
                    disableDeactivation={true}
                    value={libraryId}
                    onValueChange={setLibraryId}
                >
                    { libraries!.map((library) => {
                        return (
                            <ToggleGroup.Item value={library.Id!} aria-label={library.Name!}>
                                <Label htmlFor={library.Id!} size="$2">{library.Name!}</Label>
                            </ToggleGroup.Item>
                        )
                    })}
              </ToggleGroup>
            )}

            { isError && (
                <Text>Unable to load libraries</Text>
            )}

            <Button disabled={!!!libraryId}
                onPress={() => {
                    setLibrary({
                        musicLibraryId: libraryId!,
                        musicLibraryName: libraries?.filter((library) => library.Id == libraryId)[0].Name ?? "No library name",
                        musicLibraryPrimaryImageId: libraries?.filter((library) => library.Id == libraryId)[0].ImageTags!.Primary,
                        playlistLibraryId: playlistLibrary!.Id!,
                        playlistLibraryPrimaryImageId: playlistLibrary!.ImageTags!.Primary,
                        
                    })
                }}>
                Let's Go!
            </Button>

            <Button onPress={() => setAccessToken(undefined)}>
                Switch User
            </Button>
        </View>
    )
}