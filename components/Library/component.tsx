import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StackParamList } from "../types";
import LibraryScreen from "./screens";
import { ArtistScreen } from "../Artist/screens";
import { AlbumScreen } from "../Album/screens";
import { PlaylistScreen } from "../Playlist/screens";

const LibraryStack = createNativeStackNavigator<StackParamList>();

export default function Library(): React.JSX.Element {
    return (
        <LibraryStack.Navigator
            id="Library"
            initialRouteName="Library"
        >
            <LibraryStack.Screen
                name="Library"
                component={LibraryScreen}
                options={{
                    headerLargeTitle: true,
                    headerLargeTitleStyle: {
                        fontFamily: 'Aileron-Bold'
                    }
                }}
            />

            <LibraryStack.Screen 
                name="Artist" 
                component={ArtistScreen} 
                options={({ route }) => ({
                    title: route.params.artistName,
                    headerLargeTitle: true,
                    headerLargeTitleStyle: {
                        fontFamily: 'Aileron-Bold'
                    }
                })}
            />
            <LibraryStack.Screen
                name="Album"
                component={AlbumScreen}
                options={({ route }) => ({
                    headerShown: true,
                    headerTitle: ""
                })}
            />

            <LibraryStack.Screen
                name="Playlist"
                component={PlaylistScreen}
                options={({ route }) => ({
                    headerShown: true,
                    headerTitle: ""
                })}
            />
        </LibraryStack.Navigator>
    )
}