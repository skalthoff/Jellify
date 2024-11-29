import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView, Separator } from "tamagui";
import AccountDetails from "../helpers/account-details";
import SignOut from "../helpers/sign-out";

export default function Root() : React.JSX.Element {
    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <AccountDetails />
                <Separator marginVertical={15} />
                <SignOut />
            </ScrollView>
        </SafeAreaView>
    )
}