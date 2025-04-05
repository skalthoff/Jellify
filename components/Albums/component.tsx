import { AlbumsProps } from "../types";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { ItemCard } from "../Global/components/item-card";
import { FlatList, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchFavoriteAlbums } from "../../api/queries/functions/favorites";
import { fetchRecentlyAdded } from "../../api/queries/functions/recents";
import { QueryConfig } from "../../api/queries/query.config";
import { fetchAlbums } from "../../api/queries/functions/albums";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Albums({ navigation, route }: AlbumsProps) : React.JSX.Element {

    const { data: albums, refetch, isPending } = 
        useQuery({
            queryKey: [route.params.query],
            queryFn: () => 
                QueryKeys.RecentlyAdded 
                ? fetchRecentlyAdded(QueryConfig.limits.recents * 4, QueryConfig.limits.recents) 
                : QueryKeys.FavoriteAlbums ?
                    fetchFavoriteAlbums()
                    : fetchAlbums()
        });

    const { width } = useSafeAreaFrame();
    const headerHeight = useHeaderHeight();

        return (
            <FlatList
                style={{ paddingTop: headerHeight }}
                contentInsetAdjustmentBehavior="automatic"
                numColumns={2}
                data={albums}
                refreshControl={
                    <RefreshControl
                        refreshing={isPending}
                        onRefresh={refetch}
                    />
                }
                renderItem={({ index, item: album}) => 
                    <ItemCard
                        item={album}
                        caption={album.Name ?? "Untitled Album"}
                        subCaption={album.ProductionYear?.toString() ?? ""}
                        squared
                        onPress={() => {
                            navigation.navigate("Album", { album })
                        }}
                        width={width / 2.1}
                    />   
                }
            />
        )
    }