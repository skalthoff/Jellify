import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useServerUrl } from "@/api/queries";
import { validateServerUrl } from "../utils/validation";
import { useServerUrl as serverUrlMutation } from "../../../api/mutators/storage";

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

    let [serverUrl, setServerUrl] = useState(useServerUrl().data);

    let serverUrlIsValid = validateServerUrl(serverUrl);

    return (
        <View>

                <TextInput
                    style={styles.input}
                    value={serverUrl}
                    onChangeText={(value) => validateServerUrl(value) ?? setServerUrl(value)}
                    />

                <Button 
                    onPress={(event) => serverUrlMutation.mutate(serverUrl)}
                    disabled={!serverUrlIsValid}
                    title="Connect"/>
            </View>
    )
}