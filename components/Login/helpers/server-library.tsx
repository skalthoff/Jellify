import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { RadioGroup, Text, View, YStack } from "tamagui";
import { JellifyLibrary } from "../../../types/JellifyLibrary";
import { useAuthenticationContext } from "../provider";
import { Heading } from "../../helpers/text";
import Button from "../../helpers/button";
import _ from "lodash";
import { Api } from "@jellyfin/sdk";
import { fetchMusicLibraries } from "../../../api/libraries";
import { QueryKeys } from "../../../enums/query-keys";
import { ActivityIndicator } from "react-native";
import { RadioGroupItemWithLabel } from "../../helpers/radio-group-item-with-label";

export default function ServerLibrary(): React.JSX.Element {

    const [musicLibrary, setMusicLibrary] = useState<JellifyLibrary | undefined>(undefined);

    const { libraryName, setLibraryName, libraryId, setLibraryId } = useAuthenticationContext();

    const { apiClient, setAccessToken } = useApiClientContext();

    
    const useLibraries = (api: Api) => useQuery({
        queryKey: [QueryKeys.Libraries, api],
        queryFn: async ({ queryKey }) => await fetchMusicLibraries(queryKey[1] as Api)
    });
    
    const { data : libraries, isError, isPending, refetch } = useLibraries(apiClient!);

    useEffect(() => {
        refetch();
    }, [
        apiClient
    ])

    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <Heading>Select Music Library</Heading>

            { isPending && (
                <ActivityIndicator />
            )}

            { !_.isUndefined(libraries) &&
                <RadioGroup 
                    aria-labelledby="Select libraries" 
                    defaultValue="Library" 
                    name="library"
                >
                    <YStack width={300} alignItems="center" space="$2">
                        { libraries.map((library) => {
                            <RadioGroupItemWithLabel size="$4" value={library.Id ?? ""} label={library.Name ?? ""} />
                        })}
                    </YStack>
                </RadioGroup>
            }

            { isError && (
                <Text>Unable to load libraries</Text>
            )}

            <Button onPress={() => setAccessToken(undefined)}>
                Switch User
            </Button>
        </View>
    )
}