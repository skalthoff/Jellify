import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home/component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "react-native";
import { Colors } from "../enums/colors";
import Search from "./Search/component";
import Library from "./Library/component";
import Settings from "./Settings/component";

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

            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarIcon: ({color, size }) => (
                        <MaterialCommunityIcons name="heart-multiple-outline" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={size} />
                    )
                }}
            />

            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="dip-switch" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}