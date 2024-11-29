import { H3, ScrollView, XStack, YStack } from "tamagui";
import _ from "lodash";
import RecentlyPlayed from "./helpers/recently-played";
import { useApiClientContext } from "../jellyfin-api-provider";
import RecentArtists from "./helpers/recent-artists";
import { RefreshControl } from "react-native";
import { HomeProvider, useHomeContext } from "./provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, ProvidedHomeProps } from "./types";
import { HomeArtistScreen } from "./screens/artist";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "../Global/avatar";

export const HomeStack = createNativeStackNavigator<HomeStackParamList>();

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
                        <Avatar maxHeight={30} itemId={user!.id} />
                        <H3>{`Hi, ${user!.name}`}</H3>
                    </XStack>
                    <RecentArtists route={route} navigation={navigation} />
                    <RecentlyPlayed />
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}