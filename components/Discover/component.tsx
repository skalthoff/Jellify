import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import Index from "./screens";

export const DiscoverStack = createNativeStackNavigator<StackParamList>();

export function Discover(): React.JSX.Element {
    return (
        <DiscoverStack.Navigator
            initialRouteName="Discover"
            screenOptions={{

            }}>

            <DiscoverStack.Screen
                name="Discover"
                component={Index}
                options={{
                    headerLargeTitle: true,
                    headerLargeTitleStyle: {
                        fontFamily: 'Aileron-Bold'
                    }
                }}
            />

        </DiscoverStack.Navigator>
    )
}