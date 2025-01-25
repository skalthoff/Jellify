import { useFavoriteArtists } from "../../api/queries/favorites";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ItemCard } from "../Global/helpers/item-card";
import { ArtistsProps } from "../types";

export default function Artists({ navigation }: ArtistsProps): React.JSX.Element {

    const { data: artists, refetch, isPending } = useFavoriteArtists();

    const { width } = useSafeAreaFrame();

    return (
        <SafeAreaView edges={["left", "right"]}>
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
                            artistName={artist.Name!}
                            itemId={artist.Id!}
                            caption={artist.Name ?? "Unknown Artist"}
                            onPress={() => {
                                navigation.push("Artist", { artist })
                            }}
                            width={width / 2.1}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}