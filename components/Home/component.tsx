import { ScrollView, YStack } from "tamagui";
import _ from "lodash";
import { H2 } from "../helpers/text";
import RecentlyPlayed from "./helpers/recently-played";
import { useApiClientContext } from "../jellyfin-api-provider";
import RecentArtists from "./helpers/recent-artists";
import { RefreshControl } from "react-native";
import { HomeProvider, useHomeContext } from "./provider";


export default function Home(): React.JSX.Element {

    return (
        <HomeProvider>
            <ProvidedHome />
        </HomeProvider>
    );
}

function ProvidedHome(): React.JSX.Element {

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
                
                <RecentArtists />
                <RecentlyPlayed />
            </YStack>
        </ScrollView>
    );
}