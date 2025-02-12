import _ from "lodash";
import { HomeProvider } from "./provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { ArtistScreen } from "../Artist/screens";
import { AlbumScreen } from "../Album/screens";
import { PlaylistScreen } from "../Playlist/screens";
import { ProvidedHome } from "./component";
import DetailsScreen from "../ItemDetail/screen";
import Player from "../Player/stack";
import AddPlaylist from "./screens/add-playlist";

const HomeStack = createNativeStackNavigator<StackParamList>();

export default function Home(): React.JSX.Element {

    return (
        <HomeProvider>
            <HomeStack.Navigator 
                initialRouteName="Home"
                screenOptions={{
                }}
            >
                <HomeStack.Group>
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

                </HomeStack.Group>

                {/* https://www.reddit.com/r/reactnative/comments/1dgktbn/comment/lxd23sj/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button */}
                <HomeStack.Group screenOptions={{ 
                    presentation: 'formSheet', 
                    sheetInitialDetentIndex: 0, 
                    sheetAllowedDetents: [0.35] 
                }}>
                    <HomeStack.Screen
                        name="AddPlaylist"
                        component={AddPlaylist}
                        options={{
                            title: "Add Playlist",
                        }}
                    />
                </HomeStack.Group>

                <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                    <HomeStack.Screen
                        name="Details"
                        component={DetailsScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                </HomeStack.Group>
            </HomeStack.Navigator>
        </HomeProvider>
    );
}