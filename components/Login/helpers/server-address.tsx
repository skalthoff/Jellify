import React, { useState } from "react";
import _ from "lodash";
import { serverUrlMutation } from "../../../api/mutators/storage";
import { Button, SafeAreaView, TextInput, useColorScheme, View } from "react-native";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View>
            <TextInput 
                placeholder="Jellyfin Server Address"
                onChangeText={setServerUrl}>
            </TextInput>

            <Button 
                onPress={() => serverUrlMutation.mutate(serverUrl)}
                title="Connect"
            />

        </View>
    )
}