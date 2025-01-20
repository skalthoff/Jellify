import { useUserPlaylists } from "../../../api/queries/playlist";
import { ItemCard } from "../../../components/Global/helpers/item-card";
import { H2 } from "../../../components/Global/helpers/text";
import { ProvidedHomeProps } from "../../../components/types";
import React from "react";
import { FlatList } from "react-native";
import { View } from "tamagui";

export default function Playlists({ navigation }: ProvidedHomeProps) : React.JSX.Element {

    const { data: playlists } = useUserPlaylists();

    return (
        <View>
            <H2 marginLeft={"$2"}>Your Playlists</H2>
            <FlatList horizontal
                data={playlists}
                renderItem={({ item: playlist }) => {
                    return (
                        <ItemCard
                            itemId={playlist.Id!}
                            caption={playlist.Name ?? "Untitled Playlist"}
                            onPress={() => {
                                navigation.navigate('Playlist', {
                                    playlist
                                })
                            }} />
                    )
                }} />
        </View>
    )
}