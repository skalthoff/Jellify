import Track from "../../../components/Global/components/track";
import { StackParamList } from "../../../components/types";
import { usePlayerContext } from "../../../player/provider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList } from "react-native";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";

export default function Queue({ navigation }: { navigation: NativeStackNavigationProp<StackParamList>}): React.JSX.Element {

    const { width } = useSafeAreaFrame();
    const { queue, useSkip, nowPlaying } = usePlayerContext();

    const scrollIndex = queue.findIndex(queueItem => queueItem.item.Id! === nowPlaying!.item.Id!)

    return (
        <SafeAreaView edges={["right", "left"]}>
            <FlatList
                data={queue}
                extraData={nowPlaying}
                getItemLayout={(data, index) => (
                    { length: width / 9, offset: width / 9 * index, index}
                )}
                initialScrollIndex={scrollIndex !== -1 ? scrollIndex: 0}
                numColumns={1}
                renderItem={({ item: queueItem, index }) => {
                    return (
                        <Track
                            navigation={navigation}
                            track={queueItem.item}
                            tracklist={queue.map((track) => track.item)}
                            index={index}
                            showArtwork
                            onPress={() => {
                                console.debug(`Skipping to index ${index}`)
                                useSkip.mutate(index);
                            }}
                            isNested
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}