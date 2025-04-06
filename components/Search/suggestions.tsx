import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { StackParamList } from "../types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import Item from "../Global/components/item";
import { H3, Text } from "../Global/helpers/text";

interface SuggestionsProps {
    suggestions: BaseItemDto[] | undefined;
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Suggestions(
    props: SuggestionsProps
) : React.JSX.Element {

    return (
        <FlatList
            data={props.suggestions}
            ListHeaderComponent={(
                <H3>Suggestions</H3>
            )}
            ListEmptyComponent={(
                <Text textAlign="center">Wake now, discover that you are the eyes of the world...</Text>
            )}
            renderItem={({ item }) => {
                return <Item item={item} queueName={"Suggestions"} navigation={props.navigation} />
            }}
        />
    )
}