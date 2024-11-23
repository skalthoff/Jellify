import React from "react";
import Button from "../../helpers/button";
import { useApiClientContext } from "../../jellyfin-api-provider";

export default function SignOut(): React.JSX.Element {

    const { signOut } = useApiClientContext();

    return (
        <Button onPress={signOut}>
            Sign Out
        </Button>
    )
}