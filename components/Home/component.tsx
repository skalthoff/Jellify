import { ScrollView, YStack } from "tamagui";
import _ from "lodash";
import { H2 } from "../helpers/text";
import RecentlyPlayed from "./helpers/recently-played";
import { useApiClientContext } from "../jellyfin-api-provider";
import RecentArtists from "./helpers/recent-artists";
import { RefreshControl } from "react-native";
import { HomeProvider, useHomeContext } from "./provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList, ProvidedHomeProps } from "./types";
import { HomeArtistScreen } from "./screens/artist";

export const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function Home(): React.JSX.Element {

    return (
        <HomeProvider>
            <Stack.Navigator id="Home" initialRouteName="Home">
                <Stack.Screen name="Home" component={ProvidedHome} />
                <Stack.Screen name="Artist" component={HomeArtistScreen} />
            </Stack.Navigator>
        </HomeProvider>
    );
}

function ProvidedHome({ route, navigation }: ProvidedHomeProps): React.JSX.Element {

    const { user } = useApiClientContext();

    const { refreshing: refetching, onRefresh: onRefetch } = useHomeContext()

    return (
        <ScrollView 
            paddingLeft={10}
            refreshControl={
            <RefreshControl 
                refreshing={refetching} 
                onRefresh={onRefetch}
            />
        }>
            <YStack alignContent='flex-start'>
                <H2>{`Hi, ${user!.name}`}</H2>
                
                <RecentArtists route={route} navigation={navigation} />
                <RecentlyPlayed />
            </YStack>
        </ScrollView>
    );
}