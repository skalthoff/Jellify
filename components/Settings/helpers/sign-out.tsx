import React from "react";
import Button from "../../Global/helpers/button";
import { stop } from "react-native-track-player/lib/src/trackPlayer";
import Client from "../../../api/client";

export default function SignOut(): React.JSX.Element {

    return (
        <Button onPress={() => {
            stop();
            Client.signOut();
        }}>
            Sign Out
        </Button>
    )
}