import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { ItemCard } from "../Global/components/item-card";
import { FavoritePlaylistsProps } from "../types";
import Icon from "../Global/helpers/icon";
import { getToken, View, XStack } from "tamagui";
import { fetchFavoritePlaylists } from "../../api/queries/functions/favorites";
import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { useHeaderHeight } from '@react-navigation/elements';

export default function FavoritePlaylists({ navigation }: FavoritePlaylistsProps) : React.JSX.Element {


    const { data: playlists, isPending, refetch } = useQuery({
        queryKey: [QueryKeys.UserPlaylists],
        queryFn: () => fetchFavoritePlaylists()
    });

    const { width } = useSafeAreaFrame();
    const headerHeight = useHeaderHeight();

    return (
        <View>
            <View
                style={{
                    position: 'absolute',
                    top: headerHeight,
                    right: 0,
                    left: 0,
                    zIndex: 10,
                    paddingVertical: 8,
                }}
            >
                <XStack justifyContent="flex-end" space="$1" paddingVertical="$2">
                    <Icon 
                        name="plus-circle-outline" 
                        color={getToken("$color.telemagenta")} 
                        onPress={() => navigation.navigate('AddPlaylist')}
                    />
                </XStack>
            </View>
            <FlatList
                style={{ paddingTop: headerHeight }}
                contentInsetAdjustmentBehavior="automatic"
                numColumns={2}
                data={playlists}
                refreshControl={
                    <RefreshControl
                        refreshing={isPending}
                        onRefresh={refetch}
                    />
                }
                renderItem={({ index, item: playlist }) => 
                    <ItemCard
                        item={playlist}
                        caption={playlist.Name ?? "Untitled Playlist"}
                        onPress={() => {
                            navigation.navigate("Playlist", { playlist })
                        }}
                        width={width / 2.1}
                        squared
                    />
                }
            />
        </View>
    )
}
