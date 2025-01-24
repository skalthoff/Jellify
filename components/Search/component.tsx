import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Global/helpers/input";
import { debounce } from "lodash";
import { useSearch } from "../../api/queries/search";
import { Text } from "../Global/helpers/text";

export default function Search(): React.JSX.Element {

    const [searchString, setSearchString] = useState<string | undefined>(undefined);

    const { data: items, refetch } = useSearch(searchString)

    useEffect(() => {
        debounce(() => {
            refetch()
        }, 500)
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
                    <Text>{ item.Name ?? "" }</Text>
                )
            })}
        </SafeAreaView>
    )
}