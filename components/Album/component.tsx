import { StackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, YStack, XStack } from "tamagui";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { H4, H5, Text } from "../Global/helpers/text";
import { FlatList } from "react-native";
import { usePlayerContext } from "../../player/provider";
import { RunTimeTicks } from "../Global/helpers/time-codes";
import Track from "../Global/components/track";
import { useItemTracks } from "../../api/queries/tracks";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import FavoriteButton from "../Global/components/favorite-button";
import { useEffect } from "react";
import BlurhashedImage from "../Global/helpers/blurhashed-image";

interface AlbumProps {
    album: BaseItemDto,
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Album(props: AlbumProps): React.JSX.Element {

    props.navigation.setOptions({
        headerRight: () => {
            return (
                <FavoriteButton item={props.album} />
            )
        }
    })

    const { nowPlaying, nowPlayingIsFavorite } = usePlayerContext();

    const { width } = useSafeAreaFrame();

    const { data: tracks, isLoading, refetch } = useItemTracks(props.album.Id!, true);

    useEffect(() => {
        refetch();
    }, [
        nowPlayingIsFavorite
    ])

    return (
        <SafeAreaView edges={["right", "left"]}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <YStack 
                    alignItems="center" 
                    alignContent="center"
                    minHeight={width / 1.1}
                >
                    <BlurhashedImage
                        item={props.album}
                        width={width / 1.1}
                    />

                    <H4>{ props.album.Name ?? "Untitled Album" }</H4>
                    <H5>{ props.album.ProductionYear?.toString() ?? "" }</H5>
                </YStack>
                <FlatList
                    data={tracks}
                    extraData={nowPlaying}
                    numColumns={1}
                    renderItem={({ item: track, index }) => {
                        
                        return (
                            <Track
                                track={track}
                                tracklist={tracks!}
                                index={index}
                                navigation={props.navigation}
                            />
                        )
                        
                    }}/>

                <XStack marginTop={"$3"} justifyContent="flex-end">
                    <Text 
                        color={"$amethyst"} 
                        style={{ display: "block"}}
                        marginRight={"$1"}
                        >
                        Total Runtime: 
                    </Text>
                    <RunTimeTicks>{ props.album.RunTimeTicks }</RunTimeTicks>
                </XStack>
            </ScrollView>
        </SafeAreaView>
    )
}