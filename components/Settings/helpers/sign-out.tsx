import React from "react";
import Button from "../../Global/helpers/button";
import { stop } from "react-native-track-player/lib/src/trackPlayer";
import Client from "../../../api/client";
import { useJellifyContext } from "@/components/provider";

export default function SignOut(): React.JSX.Element {

    const { setLoggedIn } = useJellifyContext();

    return (
        <Button onPress={() => {
            stop();
            setLoggedIn(false);
            Client.signOut();
        }}>
            Sign Out
        </Button>
    )
}