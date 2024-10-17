import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { createStackNavigator } from "@react-navigation/stack";
import { useApiClientContext } from "../jellyfin-api-provider";
import { useColorScheme } from "react-native";
import { Colors } from "react-native-ui-lib";
import ServerLibrary from "./helpers/server-library";

export default function Login(): React.JSX.Element {

    const { server, username } = useApiClientContext();

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: useColorScheme() === 'dark' ? 'black' : 'white' }}}>
            {
                (_.isUndefined(server) || _.isEmpty(server.url)) ? (
                    <Stack.Screen
                        name="ServerAddress"
                        options={{
                            title: "Connect to Jellyfin",
                            animationTypeForReplace: 'pop',
                            headerStyle: {
                                backgroundColor: useColorScheme() === 'dark' ? '#000' : '#FFF',
                            },
                            headerTintColor: Colors.$iconPrimary
                        }}
                        component={ServerAddress}
                        >
                        </Stack.Screen>
                    ) : (
                    
                    (_.isUndefined(username)) ? (
                        <Stack.Screen name="ServerAuthentication" component={ServerAuthentication} />
                    ) : (
                        <Stack.Screen name="LibrarySelection" component={ServerLibrary}></Stack.Screen>
                    )
                )
            }
        </Stack.Navigator>
    );
}