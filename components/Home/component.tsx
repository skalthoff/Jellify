import _ from "lodash";
import { useApiClientContext } from "../jellyfin-api-provider";
import { HomeProvider } from "./provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList, ProvidedHomeProps } from "../types";
import { ArtistScreen } from "../Artist/screens";
import { AlbumScreen } from "../Album/screens";
import { PlaylistScreen } from "../Playlist/screens";
import { ProvidedHome } from "./screens";

const HomeStack = createNativeStackNavigator<StackParamList>();

export default function Home(): React.JSX.Element {

    const { user } = useApiClientContext();

    return (
        <HomeProvider>
            <HomeStack.Navigator 
                id="Home" 
                initialRouteName="Home"
                screenOptions={{
                }}
            >
                <HomeStack.Screen 
                    name="Home" 
                    component={ProvidedHome} 
                    options={{
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontFamily: 'Aileron-Bold'
                        }
                    }}
                />

                <HomeStack.Screen 
                    name="Artist" 
                    component={ArtistScreen} 
                    options={({ route }) => ({
                        title: route.params.artist.Name ?? "Unknown Artist",
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontFamily: 'Aileron-Bold'
                        }
                    })}
                />

                <HomeStack.Screen
                    name="Album"
                    component={AlbumScreen}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTitle: ""
                    })}
                />

                <HomeStack.Screen
                    name="Playlist"
                    component={PlaylistScreen}
                    options={({ route }) => ({
                        headerShown: true,
                        headerTitle: ""
                    })}
                />
            </HomeStack.Navigator>
        </HomeProvider>
    );
}