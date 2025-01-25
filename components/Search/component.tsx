import React, { useCallback, useState } from "react";
import Input from "../Global/helpers/input";
import { debounce } from "lodash";
import Item from "../Global/components/item";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { fetchSearchResults } from "../../api/queries/functions/search";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";

export default function Search({ 
    navigation
 }: { 
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {

    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const { data: items, refetch, isFetched, isFetching } = useQuery({
        queryKey: [QueryKeys.Search, searchString],
        queryFn: () => fetchSearchResults(searchString)
    })

    const search = useCallback(
        debounce(() => {
            refetch();
        }, 750),
        []
    );

    const handleSearchStringUpdate = (value: string | undefined) => {
        setSearchString(value)
        search();
    }

    return (
        <FlatList
            contentInsetAdjustmentBehavior="automatic"
            progressViewOffset={10}
            ListHeaderComponent={(
                <Input
                    placeholder="The Seeker"
                    onChangeText={(value) => handleSearchStringUpdate(value)}
                    value={searchString}
                />
            )}
            data={items}
            refreshing={isFetching}
            renderItem={({ index, item }) => {
                return (
                    <Item item={item} queueName={searchString ?? "Search"} navigation={navigation} />
                )
            }} 
        />
    )
}