import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import { useServerUrl } from "../../api/queries";
import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";

export default function Login(): React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    const Stack = createStackNavigator();


    let { isError, isSuccess } = useServerUrl();

    return (
        (isError ?
            <ServerAddress />
        : 
            <ServerAuthentication />
        )
    );
}