import { useFavoriteArtists } from "@/api/queries/favorites";
import { SafeAreaView } from "react-native-safe-area-context";
import { useApiClientContext } from "../jellyfin-api-provider";
import React from "react";
import { FlatList } from "react-native";
import { ItemCard } from "../Global/helpers/item-card";
import { ArtistsProps } from "../types";

export default function Artists({ navigation }: ArtistsProps): React.JSX.Element {

    const { apiClient, library } = useApiClientContext();
    const { data: artists } = useFavoriteArtists(apiClient!, library!.musicLibraryId);

    return (
        <SafeAreaView edges={["left", "right"]}>
            <FlatList
                data={artists}
                renderItem={({ index, item: artist}) => {
                    return (
                        <ItemCard
                            artistName={artist.Name!}
                            itemId={artist.Id!}
                            caption={artist.Name ?? "Unknown Artist"}
                            onPress={() => {
                                navigation.navigate("Artist",
                                    {
                                        artistId: artist.Id!,
                                        artistName: artist.Name!
                                    }
                                )
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}