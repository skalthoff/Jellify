import React from "react";
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home/component";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useColorScheme } from "react-native";
import { Colors } from "../enums/colors";
import Search from "./Search/component";
import Library from "./Library/component";
import Settings from "./Settings/component";
import { Discover } from "./Discover/component";
import { Miniplayer } from "./Player/mini-player";

const Tab = createBottomTabNavigator();

export function Tabs() : React.JSX.Element {

    const isDarkMode = useColorScheme() === 'dark';

    return (
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: isDarkMode ? Colors.Primary : Colors.Secondary
                }}
                tabBar={(props) => (
                    <>
                        <Miniplayer />
                        <BottomTabBar {...props} />
                    </>
                )}
            >
                <Tab.Screen 
                    name="Home" 
                    component={Home}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="jellyfish-outline" color={color} size={size} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Library"
                    component={Library}
                    options={{
                        headerShown: false,
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
                    name="Discover"
                    component={Discover}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="music-box-multiple-outline" color={color} size={size} />
                        )
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="dip-switch" color={color} size={size} />
                        )
                    }}
                />
            </Tab.Navigator>
    )
}