import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import SignIn from "./helpers/sign-in";


export default function Login(): React.JSX.Element {

    const Stack = createStackNavigator();

    return (
        <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
            title: 'Welcome to Jellify',
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: 'pop',
            }}
        />
    );
}