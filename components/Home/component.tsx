import { H3, ScrollView, Separator, XStack, YStack } from "tamagui";
import _ from "lodash";
import RecentlyPlayed from "./helpers/recently-played";
import { useApiClientContext } from "../jellyfin-api-provider";
import RecentArtists from "./helpers/recent-artists";
import { RefreshControl } from "react-native";
import { HomeProvider, useHomeContext } from "./provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList, ProvidedHomeProps } from "../types";
import { HomeArtistScreen } from "./screens/artist";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../Global/avatar";
import { HomeAlbumScreen } from "./screens/album";

export const HomeStack = createNativeStackNavigator<StackParamList>();

export default function Home(): React.JSX.Element {

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
                        headerShown: false
                    }}
                />

                <HomeStack.Screen 
                    name="Artist" 
                    component={HomeArtistScreen} 
                    options={({ route }) => ({
                        title: route.params.artistName,
                        headerLargeTitle: true,
                        headerLargeTitleStyle: {
                            fontFamily: 'Aileron-Bold'
                        }
                    })}
                />

                <HomeStack.Screen
                    name="Album"
                    component={HomeAlbumScreen}
                    options={({ route }) => ({
                        headerShown: false
                    })}
                />
            </HomeStack.Navigator>
        </HomeProvider>
    );
}

function ProvidedHome({ route, navigation }: ProvidedHomeProps): React.JSX.Element {

    const { user } = useApiClientContext();

    const { refreshing: refetching, onRefresh: onRefetch } = useHomeContext()

    return (
        <SafeAreaView>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                paddingLeft={10}
                refreshControl={
                    <RefreshControl 
                        refreshing={refetching} 
                        onRefresh={onRefetch}
                    />
                }>
                <YStack alignContent='flex-start'>
                    <XStack>
                        <H3>{`Hi, ${user!.name}`}</H3>
                        <YStack />
                        <Avatar maxHeight={30} itemId={user!.id} />
                    </XStack>
                    <Separator marginVertical={15} />
                    <RecentArtists route={route} navigation={navigation} />
                    <Separator marginVertical={15} />
                    <RecentlyPlayed />
                    <Separator marginVertical={15} />
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}