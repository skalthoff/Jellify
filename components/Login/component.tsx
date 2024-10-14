import { createStackNavigator } from "@react-navigation/stack";
import { Button, StyleSheet, Text, TextInput, useColorScheme, View } from "react-native";
import SignIn from "./helpers/sign-in";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import { useServerUrl } from "../../api/queries";
import { useServerUrl as serverUrlMutation } from "../../api/mutators/storage";
import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import { validateServerUrl } from "./utils/validation";

export default function Login(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    
    const styles = StyleSheet.create({
        input: {
            height: 40,
            margin: 12,
            borderRadius: 1,
            borderWidth: 1,
            padding: 10,
            color: isDarkMode ? "white" : "black"
        }
    })

    const Stack = createStackNavigator();

    let [serverUrl, setServerUrl] = useState(useServerUrl().data);

    let serverUrlIsValid = validateServerUrl(serverUrl);

    return (
        (_.isEmpty(serverUrl) ?
            <View>

                <TextInput
                    style={styles.input}
                    value={serverUrl}
                    onChangeText={(value) => setServerUrl}
                    />

                <Button 
                    onPress={(event) => serverUrlMutation.mutate(serverUrl)}
                    disabled={!serverUrlIsValid}
                    title="Submit Server URL"/>
            </View>
        : 
            <ServerAuthentication />
        )
    );
}