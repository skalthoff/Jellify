import React, { useState } from "react";
import _ from "lodash";
import { Button, Input, YStack } from "tamagui";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    return (
        <YStack>
                <Input placeholder="Jellyfin Server Address"
                    // onChangeText={(value) => validateServerUrl(value) ?? setServerUrl(value)}
                    ></Input>

                <Button 
                    // onPress={(event) => serverUrlMutation.mutate(serverUrl)}
                    // disabled={_.isEmpty(serverUrl)}
                    >
                        Connect
                </Button>
        </YStack>
    )
}