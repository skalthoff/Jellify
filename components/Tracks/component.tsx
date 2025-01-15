import { useFavoriteTracks } from "@/api/queries/favorites";
import { useApiClientContext } from "../jellyfin-api-provider";
import { TracksProps } from "../types";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native";
import Track from "../Global/components/track";

export default function Tracks({ navigation }: TracksProps) : React.JSX.Element {
    const { apiClient, library } = useApiClientContext();
    const { data: tracks, refetch, isPending } = useFavoriteTracks(apiClient!, library!.musicLibraryId);

    const { width } = useSafeAreaFrame();

    return (
        <SafeAreaView edges={["right", "left"]}>
            <FlatList
                contentInsetAdjustmentBehavior="automatic"
                numColumns={1}
                data={tracks}
                refreshControl={
                    <RefreshControl
                        refreshing={isPending}
                        onRefresh={refetch}
                    />
                }
                renderItem={({ index, item: track}) => {
                    return (
                        <Track
                            showArtwork
                            track={track}
                            tracklist={tracks?.slice(index, index + 50) ?? []}
                            index={index}
                            queueName="Favorite Tracks"
                        />

                    )
                }}
            />
        </SafeAreaView>
    )
}