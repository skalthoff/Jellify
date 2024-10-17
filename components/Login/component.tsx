import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { createStackNavigator } from "@react-navigation/stack";
import { useApiClientContext } from "../jellyfin-api-provider";
import { useColorScheme } from "react-native";
import { Colors } from "react-native-ui-lib";

export default function Login(): React.JSX.Element {

    const { server, changeServer } = useApiClientContext();

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: useColorScheme() === 'dark' ? 'black' : 'white' }}}>
            { 
                (_.isUndefined(server) || _.isEmpty(server.url)) ? (
                    <Stack.Screen
                        name="ServerAddress"
                        options={{
                            title: "Connect to Jellyfin",
                            animationTypeForReplace: changeServer ? 'pop' : 'push',
                            headerStyle: {
                                backgroundColor: useColorScheme() === 'dark' ? '#000' : '#FFF',
                            },
                            headerTintColor: Colors.$iconPrimary
                        }}
                        component={ServerAddress}
                        >
                        </Stack.Screen>
                    ) : (
                    <Stack.Screen
                        name="ServerAuthentication"
                        component={ServerAuthentication}
                        options={{
                            title: `Sign in to ${server.name}`,
                            animationTypeForReplace: 'push',
                            headerStyle: {
                                backgroundColor: useColorScheme() === 'dark' ? '#000' : '#FFF',
                            },
                            headerTintColor: Colors.$iconPrimary
                        }}
                    />
                )
            }
        </Stack.Navigator>
    );
}