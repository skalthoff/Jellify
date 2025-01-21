import { ProvidedHomeProps } from "../../../components/types";
import { ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { YStack, XStack, Separator } from "tamagui";
import Playlists from "../helpers/playlists";
import RecentArtists from "../helpers/recent-artists";
import RecentlyPlayed from "../helpers/recently-played";
import { useHomeContext } from "../provider";
import { H3 } from "../../../components/Global/helpers/text";
import Avatar from "../../../components/Global/helpers/avatar";
import Client from "../../../api/client";
import { usePlayerContext } from "@/player/provider";
import { useEffect } from "react";

export function ProvidedHome({ route, navigation }: ProvidedHomeProps): React.JSX.Element {

    const { refreshing: refetching, onRefresh: onRefetch } = useHomeContext()

    const { nowPlayingIsFavorite } = usePlayerContext();

    useEffect(() => {
        onRefetch()
    }, [
        nowPlayingIsFavorite
    ])

    return (
        <SafeAreaView edges={["top", "right", "left"]}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                refreshControl={
                    <RefreshControl 
                        refreshing={refetching} 
                        onRefresh={onRefetch}
                    />
                }>
                <YStack alignContent='flex-start'>
                    <XStack margin={"$2"}>
                        <H3>{`Hi, ${Client.user!.name}`}</H3>
                        <YStack />
                        <Avatar maxHeight={30} itemId={Client.user!.id!} />
                    </XStack>

                    <Separator marginVertical={"$2"} />

                    <RecentArtists route={route} navigation={navigation} />

                    <Separator marginVertical={"$3"} />

                    <RecentlyPlayed />

                    <Separator marginVertical={"$3"} />

                    <Playlists route={route} navigation={navigation}/>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}