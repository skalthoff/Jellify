import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { useServer } from "../../api/queries/keychain";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

export default function Login(): React.JSX.Element {

    let { isError, data } = useServer;

    const Stack = createStackNavigator();

    let [loginState, setLoginState] = useState({})

    return (
        <Stack.Navigator>
            { 
                (isError || _.isUndefined(data) || _.isEmpty(data.version)) ? (
                    <Stack.Screen
                        name="ServerAddress"
                        options={{title: "ServerAddress"}}
                        component={ServerAddress}
                        >
                        </Stack.Screen>
                    ) : (
                    <Stack.Screen
                        name="ServerAuthentication"
                        component={ServerAuthentication}
                        options={{title: "Server Authentication"}}
                    />
                )
            }
        </Stack.Navigator>
    );
}