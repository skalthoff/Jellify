import { useSafeAreaFrame } from "react-native-safe-area-context";
import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { ItemCard } from "../Global/components/item-card";
import { ArtistsProps } from "../types";
import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "../../api/queries/functions/artists";
import { fetchRecentlyPlayedArtists } from "../../api/queries/functions/recents";
import { fetchFavoriteArtists } from "../../api/queries/functions/favorites";
import { QueryConfig } from "../../api/queries/query.config";
import { useHeaderHeight } from '@react-navigation/elements';


const queryMap = {
    [QueryKeys.RecentlyPlayedArtists] : {
        key: [QueryKeys.RecentlyPlayedArtists, QueryConfig.limits.recents * 4, QueryConfig.limits.recents],
        fn: () => fetchRecentlyPlayedArtists(QueryConfig.limits.recents * 4, QueryConfig.limits.recents)
    },
    [QueryKeys.FavoriteArtists] : {
        key: [QueryKeys.FavoriteArtists],
        fn: () => fetchFavoriteArtists()
    },
    [QueryKeys.AllArtists] : {
        key: [QueryKeys.AllArtists],
        fn: () => fetchArtists()
    }
}


export default function Artists({ 
    navigation,
    route
}: ArtistsProps): React.JSX.Element {

    const queryType = queryMap[route.params.query] ?? queryMap[QueryKeys.AllArtists]

    const { data: artists, refetch, isPending } = useQuery({
                queryKey: queryType.key,
                queryFn: queryType.fn,
            })

    const { width } = useSafeAreaFrame();
    const headerHeight = useHeaderHeight();


    return (
        <FlatList
            style={{ paddingTop: headerHeight }}
            contentInsetAdjustmentBehavior="automatic"
            numColumns={3}
            data={artists}
            refreshControl={
                <RefreshControl
                    refreshing={isPending}
                    onRefresh={refetch}
                />
            }
            renderItem={({ index, item: artist}) =>
                <ItemCard
                    item={artist}
                    caption={artist.Name ?? "Unknown Artist"}
                    onPress={() => {
                        navigation.navigate("Artist", { artist })
                    }}
                    width={width / 3.3}
                />
            }
        />
    )
}