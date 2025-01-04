import React from "react";
import Button from "../../Global/button";
import { useApiClientContext } from "../../jellyfin-api-provider";

export default function SignOut(): React.JSX.Element {

    const { signOut } = useApiClientContext();

    return (
        <Button onPress={signOut}>
            Sign Out
        </Button>
    )
}