import React, { useState } from "react";
import { validateServerUrl } from "../utils/validation";
import { serverUrlMutation } from "../../../api/mutators/storage";
import _ from "lodash";
import { Button, Input, YStack } from "tamagui";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    const handleServerUrlMutation = () => {
        serverUrlMutation.mutate(serverUrl)
    }

    return (
        <YStack>
                <Input placeholder="Jellyfin Server Address"
                    onChangeText={(value) => validateServerUrl(value) ? setServerUrl(value) : console.log("Invalid Address")}
                    ></Input>

                <Button 
                    onPress={handleServerUrlMutation}
                    disabled={_.isEmpty(serverUrl)}>
                        Connect
                </Button>
        </YStack>
    )
}