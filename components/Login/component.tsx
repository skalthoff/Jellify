import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import SignIn from "./helpers/sign-in";

const styles = StyleSheet.create({
    text: {
        color: "#FFFFFF"
    }
})

export default function Login(): React.JSX.Element {

    const Stack = createStackNavigator();

    return (
        <Text style={styles.text} >Alyssa please be impressed</Text>
    );
}