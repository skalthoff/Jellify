import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Root from "./screens/root";

export const SettingsStack = createNativeStackNavigator();

export default function Settings(): React.JSX.Element {
    return (
        <SettingsStack.Navigator>

            <SettingsStack.Screen 
                name="Settings" 
                component={Root} 
                options={{
                    headerLargeTitle: true,
                    headerLargeTitleStyle: {
                        fontFamily: 'Aileron-Bold'
                    }
                }}
            />
        </SettingsStack.Navigator>
    )
}