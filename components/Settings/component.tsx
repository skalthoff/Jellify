import React from "react";
import { ScrollView } from "tamagui";
import AccountDetails from "./helpers/account-details";
import SignOut from "./helpers/sign-out";

export default function Settings(): React.JSX.Element {
    return (
        <ScrollView>
            <AccountDetails />
            <SignOut />
        </ScrollView>
    )
}