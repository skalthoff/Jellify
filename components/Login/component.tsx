import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { createStackNavigator } from "@react-navigation/stack";
import { useApiClientContext } from "../jellyfin-api-provider";
import ServerLibrary from "./helpers/server-library";

export default function Login(): React.JSX.Element {

    const { server, changeServer, changeUser, username } = useApiClientContext();

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                (_.isUndefined(server) || _.isEmpty(server.url) || changeServer) ? (
                    <Stack.Screen
                        name="ServerAddress"
                        options={{
                            headerShown: false,     
                            animationTypeForReplace: changeServer ? 'pop' : 'push'    
                        }}
                        component={ServerAddress}
                        />
                    ) : (
                    
                    (_.isUndefined(username) || changeUser) ? (
                        <Stack.Screen 
                            name="ServerAuthentication" 
                            options={{ 
                                headerShown: false, 
                                animationTypeForReplace: changeUser ? 'pop' : 'push'
                            }} 
                            component={ServerAuthentication} 
                        />
                    ) : (
                        <Stack.Screen 
                            name="LibrarySelection" 
                            options={{ 
                                headerShown: false 
                            }} 
                            component={ServerLibrary}
                        />
                    )
                )
            }
        </Stack.Navigator>
    );
}