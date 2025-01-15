import Track from "@/components/Global/components/track";
import { usePlayerContext } from "@/player/provider";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Queue(): React.JSX.Element {

    const { queue, useSkip, nowPlaying } = usePlayerContext();

    return (
        <SafeAreaView edges={["right", "left"]}>
            <FlatList
                data={queue}
                extraData={nowPlaying}
                numColumns={1}
                renderItem={({ item: queueItem, index }) => {
                    return (
                        <Track
                            track={queueItem.item}
                            tracklist={queue.map((track) => track.item)}
                            index={index}
                            showArtwork
                            onPress={() => {
                                console.debug(`Skipping to index ${index}`)
                                useSkip.mutate(index);
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}