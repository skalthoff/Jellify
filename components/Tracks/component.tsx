import { useFavoriteTracks } from "@/api/queries/favorites";
import { useApiClientContext } from "../jellyfin-api-provider";
import { StackParamList, TracksProps } from "../types";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { FlatList, RefreshControl } from "react-native";
import Track from "../Global/components/track";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Tracks({ navigation }: { navigation: NativeStackNavigationProp<StackParamList> }) : React.JSX.Element {
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
                            navigation={navigation}
                            showArtwork
                            track={track}
                            tracklist={tracks?.slice(index, index + 50) ?? []}
                            queueName="Favorite Tracks"
                        />

                    )
                }}
            />
        </SafeAreaView>
    )
}