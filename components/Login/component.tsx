import _ from "lodash"
import ServerAuthentication from "./helpers/server-authentication";
import ServerAddress from "./helpers/server-address";
import { createStackNavigator } from "@react-navigation/stack";
import ServerLibrary from "./helpers/server-library";
import { useAuthenticationContext } from "./provider";
import { useEffect } from "react";
import { useApiClientContext } from "../jellyfin-api-provider";

export default function Login(): React.JSX.Element {

    const { triggerAuth, setTriggerAuth } = useAuthenticationContext();

    const { server, user } = useApiClientContext();

    const Stack = createStackNavigator();

    useEffect(() => {
        setTriggerAuth(false);
    })

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {
                (_.isUndefined(server)) ? (
                    <Stack.Screen
                        name="ServerAddress"
                        options={{
                            headerShown: false,     
                            animationTypeForReplace: triggerAuth ? 'push' : 'pop'    
                        }}
                        component={ServerAddress}
                        />
                    ) : (
                    
                    (_.isUndefined(user)) ? (
                        <Stack.Screen 
                            name="ServerAuthentication" 
                            options={{ 
                                headerShown: false, 
                                animationTypeForReplace: 'push'
                            }} 
                            component={ServerAuthentication} 
                        />
                    ) : (
                        <Stack.Screen 
                            name="LibrarySelection" 
                            options={{ 
                                headerShown: false, 
                                animationTypeForReplace: 'push'
                            }} 
                            component={ServerLibrary}
                        />
                    )
                )
            }
        </Stack.Navigator>
    );
}