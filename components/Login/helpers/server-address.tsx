import React, { useState } from "react";
import { validateServerUrl } from "../utils/validation";
import { useServerUrl as serverUrlMutation } from "../../../api/mutators/storage";
import _ from "lodash";
import { Button, Input, YStack } from "tamagui";

export default function ServerAddress(): React.JSX.Element {

    console.log("YEET")
    const [serverUrl, setServerUrl] = useState("");
    console.log("YEEZUS")
    return (
        <YStack>
                <Input placeholder="Jellyfin Server Address"
                    onChangeText={(value) => validateServerUrl(value) ?? setServerUrl(value)}
                    />

                <Button 
                    onPress={(event) => serverUrlMutation.mutate(serverUrl)}
                    disabled={_.isEmpty(serverUrl)}>
                        Connect
                </Button>
        </YStack>
    )
}