import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { validateServerUrl } from "../utils/validation";
import { useServerUrl as serverUrlMutation } from "../../../api/mutators/storage";
import _ from "lodash";
import { Button, YStack } from "tamagui";

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderRadius: 1,
        borderWidth: 1,
        padding: 10,
    }
})

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    return (
        <YStack>
                <TextInput
                    style={styles.input}
                    value={serverUrl}
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