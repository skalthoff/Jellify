import { useFavoriteArtists } from "../../api/queries/favorites";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ItemCard } from "../Global/components/item-card";
import { ArtistsProps } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { useRecentlyPlayedArtists } from "../../api/queries/recently-played";
import { horizontalCardLimit } from "../Global/component.config";

export default function Artists({ 
    navigation,
    route
}: ArtistsProps): React.JSX.Element {

    const { data: artists, refetch, isPending } = 
        route.params.query === 
            QueryKeys.FavoriteArtists ? useFavoriteArtists() : 
            QueryKeys.RecentlyPlayedArtists ? useRecentlyPlayedArtists(horizontalCardLimit + 3) :
            useFavoriteArtists();

    const { width } = useSafeAreaFrame();

    return (
        <FlatList
            contentInsetAdjustmentBehavior="automatic"
            numColumns={2}
            data={artists}
            refreshControl={
                <RefreshControl
                    refreshing={isPending}
                    onRefresh={refetch}
                />
            }
            renderItem={({ index, item: artist}) => {
                return (
                    <ItemCard
                        item={artist}
                        caption={artist.Name ?? "Unknown Artist"}
                        onPress={() => {
                            navigation.navigate("Artist", { artist })
                        }}
                        width={width / 2.1}
                    />
                )
            }}
            style={{
                overflow: 'hidden' // Prevent unnecessary memory usage
            }} 
        />
    )
}