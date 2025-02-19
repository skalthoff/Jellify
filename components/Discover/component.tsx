import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import RecentlyAdded from "./helpers/just-added";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";

export default function Index({ navigation }: { navigation : NativeStackNavigationProp<StackParamList> }) : React.JSX.Element {
    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                removeClippedSubviews
            >
                <RecentlyAdded navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}