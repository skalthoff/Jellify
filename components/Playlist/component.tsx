import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { ScrollView, XStack, YStack } from "tamagui";
import { usePlayerContext } from "../../player/provider";
import { useItemTracks } from "../../api/queries/tracks";
import { RunTimeTicks } from "../Global/helpers/time-codes";
import { H4, H5, Text } from "../Global/helpers/text";
import Track from "../Global/components/track";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import BlurhashedImage from "../Global/helpers/blurhashed-image";

interface PlaylistProps { 
    playlist: BaseItemDto;
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Playlist(props: PlaylistProps): React.JSX.Element {

    const { nowPlaying, nowPlayingIsFavorite } = usePlayerContext();

    const { data: tracks, isLoading, refetch } = useItemTracks(props.playlist.Id!);

    useEffect(() => {
        refetch();
    }, [
        nowPlayingIsFavorite
    ]);

    return (
        <SafeAreaView edges={["right", "left"]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <YStack alignItems="center">
                    <BlurhashedImage
                        item={props.playlist}
                        size={300}
                    />

                    <H4>{ props.playlist.Name ?? "Untitled Playlist" }</H4>
                    <H5>{ props.playlist.ProductionYear?.toString() ?? "" }</H5>
                </YStack>
                <FlatList
                    data={tracks}
                    extraData={nowPlaying}
                    numColumns={1}
                    renderItem={({ item: track, index }) => {

                        return (
                            <Track
                                navigation={props.navigation}
                                track={track}
                                tracklist={tracks!}
                                index={index}
                                queueName={props.playlist.Name ?? "Untitled Playlist"}
                                showArtwork
                            />
                        )

                }}/>

                <XStack justifyContent="flex-end">
                    <Text 
                        color={"$borderColor"} 
                        style={{ display: "block"}}
                    >
                        Total Runtime:
                    </Text>
                    <RunTimeTicks>{ props.playlist.RunTimeTicks }</RunTimeTicks>
                </XStack>
            </ScrollView>
        </SafeAreaView>
    )
}