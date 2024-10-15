import React, { useState } from "react";
import _ from "lodash";
import { Button, TextField, View } from "react-native-ui-lib";
import { serverUrlMutation } from "../../../api/mutators/storage";
import Toast from "react-native-ui-lib/src/incubator/toast";
import { useColorScheme } from "react-native";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View useSafeArea>
            <TextField 
                placeholder="Jellyfin Server Address"
                onChangeText={setServerUrl}>
            </TextField>

            <Button 
                backgroundColor={isDarkMode ? 'black' : 'white'}
                onPress={() => serverUrlMutation.mutate(serverUrl)}
                label="Connect"
            />

            <Toast  
                visible={serverUrlMutation.isError}  
                message="Unable to connect to Jellyfin"
                position={'bottom'}  
                autoDismiss={2500}/>
        </View>
    )
}