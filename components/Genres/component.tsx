import { StackParamList } from "../types";
import { ScrollView, RefreshControl } from "react-native";
import { YStack } from "tamagui";
import Genre from "./helpers/genre";
import { useGenresContext } from "./provider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useHeaderHeight } from "@react-navigation/elements";

// to implement
// map through provided genres data to generate carosels 

export function GenresScreen({ 
    navigation 
} : { 
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {

    const { refreshing: refetching, onRefresh } = useGenresContext()

    const headerHeight = useHeaderHeight();

    return (
        <ScrollView 
            style={{ paddingTop: headerHeight }}
            contentInsetAdjustmentBehavior="automatic"
            refreshControl={
                <RefreshControl 
                refreshing={refetching} 
                onRefresh={onRefresh}
                />
            }
            removeClippedSubviews // Save memory usage
        >
            <YStack alignContent='flex-start' paddingHorizontal='$2'>
                {

                }
                <Genre navigation={navigation} genre={{ name: "Dance" }} />

            </YStack>
        </ScrollView>
    );
}