import React from "react";
import { SafeAreaView } from "react-native";
import { ListItem, ScrollView, Separator, YGroup } from "tamagui";
import AccountDetails from "../helpers/account-details";
import SignOut from "../helpers/sign-out";
import ServerDetails from "../helpers/server-details";
import LibraryDetails from "../helpers/library-details";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@/components/types";

export default function Root({ 
    navigation 
}: { 
    navigation: NativeStackNavigationProp<StackParamList>
}) : React.JSX.Element {

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <YGroup 
                    alignSelf="center" 
                    bordered 
                    width={240} 
                    size="$5"
                >
                    <YGroup.Item>
                        <ListItem
                            hoverTheme
                            pressTheme
                            title="Account Details"
                            subTitle="Everything is about you, man"
                            onPress={() => {
                                navigation.push("AccountDetails")
                            }}
                        />
                    </YGroup.Item>
                </YGroup>

                <ServerDetails />
                <Separator marginVertical={15} />
                <LibraryDetails />
                <SignOut />
            </ScrollView>
        </SafeAreaView>
    )
}