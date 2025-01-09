import React, { useEffect } from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Spinner, Text, ToggleGroup, View } from "tamagui";
import { useAuthenticationContext } from "../provider";
import { H1, Label } from "../../Global/helpers/text";
import Button from "../../Global/helpers/button";
import _ from "lodash";
import { useMusicLibraries, usePlaylistLibrary } from "@/api/queries/libraries";

export default function ServerLibrary(): React.JSX.Element {

    const { libraryId, setLibraryId } = useAuthenticationContext();
    const { apiClient, setUser, setLibrary } = useApiClientContext();

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
            <H1>Select Music Library</H1>

            { isPending ? (
                <Spinner size="large" />
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

            <Button onPress={() => setUser(undefined)}>
                Switch User
            </Button>
        </View>
    )
}