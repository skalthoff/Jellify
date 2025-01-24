import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Global/helpers/input";
import { debounce } from "lodash";
import { useSearch } from "../../api/queries/search";
import Item from "../Global/components/item";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";

export default function Search({ 
    navigation
 }: { 
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {

    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const { data: items, refetch } = useSearch(searchString)

    useEffect(() => {
        debounce(() => {
            refetch()
        }, 750)
    }, [
        searchString
    ])

    return (
        <SafeAreaView edges={["top", "right", "left"]}>
            <Input
                placeholder="The Seeker"
                onChangeText={(value) => setSearchString(value)}
                value={searchString}
            />

            { items?.map(item => {
                return (
                    <Item item={item} navigation={navigation} queueName={searchString ?? "Search"} />
                )
            })}
        </SafeAreaView>
    )
}