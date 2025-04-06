import React, { useCallback, useState } from "react";
import Input from "../Global/helpers/input";
import Item from "../Global/components/item";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { fetchSearchResults } from "../../api/queries/functions/search";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";
import { H3, Text } from "../Global/helpers/text";
import { fetchSearchSuggestions } from "../../api/queries/functions/suggestions";
import { Spinner, YStack } from "tamagui";
import Suggestions from "./suggestions";
import { isEmpty, isUndefined } from "lodash";

export default function Search({ 
    navigation
 }: { 
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {

    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const { data: items, refetch, isFetching: fetchingResults } = useQuery({
        queryKey: [QueryKeys.Search, searchString],
        queryFn: () => fetchSearchResults(searchString)
    });

    const { data: suggestions, isFetching: fetchingSuggestions, refetch: refetchSuggestions } = useQuery({
        queryKey: [QueryKeys.SearchSuggestions],
        queryFn: () => fetchSearchSuggestions()
    });

    const search = useCallback(() => {

        let timeout : NodeJS.Timeout;
        
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => refetch, 1000)
        }
    }, []);

    const handleSearchStringUpdate = (value: string | undefined) => {
        setSearchString(value)
        search();
        refetchSuggestions();
    }

    return (
        <FlatList
            contentInsetAdjustmentBehavior="automatic"
            progressViewOffset={10}
            ListHeaderComponent={(
                <YStack>
                    <Input
                        placeholder="Seek and ye shall find"
                        onChangeText={(value) => handleSearchStringUpdate(value)}
                        value={searchString}
                    />

                    { !isEmpty(items) && (
                        <H3>Results</H3>
                    )}
                </YStack>
            )}
            ListEmptyComponent={() => {
                return (
                    <YStack
                        alignContent="center"
                        justifyContent="flex-end"
                        marginTop={"$4"}
                    >
                        { fetchingResults ? (
                            <Spinner />
                        ) : (
                            <Suggestions suggestions={suggestions} navigation={navigation} />
                        )}
                    </YStack>
                )
            }}
            data={items}
            refreshing={fetchingResults}
            renderItem={({ item }) => 
                <Item item={item} queueName={searchString ?? "Search"} navigation={navigation} />
            }
        />
    )
}