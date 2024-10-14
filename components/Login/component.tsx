import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, TextInput, useColorScheme } from "react-native";
import SignIn from "./helpers/sign-in";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import { useServerUrl } from "../../api/queries";

export default function Login(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';
    
    const styles = StyleSheet.create({
        input: {
            color: isDarkMode ? "white" : "black"
        }
    })

    const Stack = createStackNavigator();

    let [serverUrl, setServerUrl] = useState(!!!useServerUrl().data ? "" : useServerUrl().data!);

    return (
        <TextInput
            style={styles.input}
            value={serverUrl}
            onChangeText={(value) => setServerUrl}
            />
        );
}