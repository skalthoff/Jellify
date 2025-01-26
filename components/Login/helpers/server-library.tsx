import React, { useState } from "react";
import { Spinner, Text, ToggleGroup } from "tamagui";
import { useAuthenticationContext } from "../provider";
import { H1, Label } from "../../Global/helpers/text";
import Button from "../../Global/helpers/button";
import _ from "lodash";
import { useMusicLibraries, usePlaylistLibrary } from "../../../api/queries/libraries";
import { SafeAreaView } from "react-native-safe-area-context";
import Client from "../../../api/client";
import { useJellifyContext } from "../../../components/provider";

export default function ServerLibrary(): React.JSX.Element {

    const { setUser } = useAuthenticationContext();

    const { setLoggedIn } = useJellifyContext();

    const [libraryId, setLibraryId] = useState<string | undefined>(undefined);

    const { data : libraries, isError, isPending, refetch: refetchMusicLibraries } = useMusicLibraries();
    const { data : playlistLibrary, refetch: refetchPlaylistLibrary } = usePlaylistLibrary();

    return (
        <SafeAreaView>
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
                    Client.setLibrary({
                        musicLibraryId: libraryId!,
                        musicLibraryName: libraries?.filter((library) => library.Id == libraryId)[0].Name ?? "No library name",
                        musicLibraryPrimaryImageId: libraries?.filter((library) => library.Id == libraryId)[0].ImageTags!.Primary,
                        playlistLibraryId: playlistLibrary!.Id!,
                        playlistLibraryPrimaryImageId: playlistLibrary!.ImageTags!.Primary,
                    });
                    setLoggedIn(true);
                }}>
                Let's Go!
            </Button>

            <Button onPress={() => {
                Client.switchUser();
                setUser(undefined);
            }}>
                Switch User
            </Button>
        </SafeAreaView>
    )
}