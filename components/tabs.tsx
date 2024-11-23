import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home/component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "react-native";
import { Colors } from "../enums/colors";

const Tab = createBottomTabNavigator();

export function Tabs() {

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: isDarkMode ? Colors.Primary : Colors.Secondary
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="jellyfish-outline" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}