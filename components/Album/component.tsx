import { StackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, YStack, XStack } from "tamagui";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { H3, H4, H5, Text } from "../Global/helpers/text";
import { FlatList } from "react-native";
import { usePlayerContext } from "../../player/provider";
import { RunTimeTicks } from "../Global/helpers/time-codes";
import Track from "../Global/components/track";
import { useItemTracks } from "../../api/queries/tracks";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import FavoriteButton from "../Global/components/favorite-button";
import { useEffect } from "react";
import BlurhashedImage from "../Global/components/blurhashed-image";
import Avatar from "../Global/helpers/avatar";

interface AlbumProps {
    album: BaseItemDto,
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Album({
    album,
    navigation
}: AlbumProps): React.JSX.Element {

    navigation.setOptions({
        headerRight: () => {
            return (
                <FavoriteButton item={album} />
            )
        }
    })

    const { nowPlaying, nowPlayingIsFavorite } = usePlayerContext();

    const { width } = useSafeAreaFrame();

    const { data: tracks, isLoading, refetch } = useItemTracks(album.Id!, true);

    useEffect(() => {
        refetch();
    }, [
        nowPlayingIsFavorite
    ])

    return (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <YStack 
                alignItems="center" 
                alignContent="center"
                minHeight={width / 1.1}
            >
                <BlurhashedImage
                    item={album}
                    width={width / 1.1}
                />

                <H4>{ album.Name ?? "Untitled Album" }</H4>
                <H5>{ album.ProductionYear?.toString() ?? "" }</H5>
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
                            navigation={navigation}
                        />
                    )
                    
                }}/>

            <XStack marginTop={"$3"} justifyContent="flex-end">
                <Text 
                    color={"$borderColor"} 
                    style={{ display: "block"}}
                    marginRight={"$1"}
                    >
                    Total Runtime: 
                </Text>
                <RunTimeTicks>{ album.RunTimeTicks }</RunTimeTicks>
            </XStack>

            <YStack justifyContent="flex-start">
                <H3>Album Artists</H3>
                <FlatList
                    horizontal
                    data={album.ArtistItems}
                    renderItem={({ index, item: artist }) => {
                        return (
                            <Avatar
                                item={artist}
                                width={width / 5}
                                onPress={() => {
                                    navigation.push("Artist", {
                                        artist
                                    });
                                }}
                                subheading={artist.Name ?? "Unknown Artist"}
                            />
                        )
                    }}
                    />
            </YStack>
        </ScrollView>
    )
}