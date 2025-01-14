import Track from "@/components/Global/components/track";
import { usePlayerContext } from "@/player/provider";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { skip } from "react-native-track-player/lib/src/trackPlayer";

export default function Queue(): React.JSX.Element {

    const { queue } = usePlayerContext();

    return (
        <SafeAreaView edges={["right", "left"]}>
            <FlatList
                data={queue}
                numColumns={1}
                renderItem={({ item: queueItem, index }) => {
                    return (
                        <Track
                            track={queueItem}
                            tracklist={queue}
                            index={index}
                            showArtwork
                            onPress={() => {
                                skip(index);
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}