import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import RecentlyAdded from "./helpers/just-added";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { H2 } from "../Global/helpers/text";
import Client from "../../api/client";

export default function Index({ navigation }: { navigation : NativeStackNavigationProp<StackParamList> }) : React.JSX.Element {
    return (
        <SafeAreaView edges={["top", "left", "right"]}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                removeClippedSubviews
            >
                <H2>{`Recently added to ${Client.server?.name ?? "Jellyfin"}`}</H2>
                <RecentlyAdded navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    )
}