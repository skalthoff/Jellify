import Icon from "../../../components/Global/helpers/icon";
import Track from "../../../components/Global/components/track";
import { StackParamList } from "../../../components/types";
import { usePlayerContext } from "../../../player/provider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";

export default function Queue({ navigation }: { navigation: NativeStackNavigationProp<StackParamList>}): React.JSX.Element {

    const { width } = useSafeAreaFrame();
    const { queue, useClearQueue, useSkip, nowPlaying,  } = usePlayerContext();

    navigation.setOptions({
        headerRight: () => {
            return (
                <Icon name="notification-clear-all" onPress={() => {
                    useClearQueue.mutate()
                }}/>
            )
        }
    })

    const scrollIndex = queue.findIndex(queueItem => queueItem.item.Id! === nowPlaying!.item.Id!)

    return (
        <DraggableFlatList
            contentInsetAdjustmentBehavior="automatic"
            data={queue}
            extraData={nowPlaying}
            getItemLayout={(data, index) => (
                { length: width / 9, offset: width / 9 * index, index}
            )}
            initialScrollIndex={scrollIndex !== -1 ? scrollIndex: 0}
            keyExtractor={({ item }, index) => {
                return `${index}-${item.Id}`
            }}
            numColumns={1}
            onRelease={(index) => }
            renderItem={({ item: queueItem, getIndex, drag, isActive }) => {

                const index = getIndex();

                return (
                    <Track
                        navigation={navigation}
                        track={queueItem.item}
                        tracklist={queue.map((track) => track.item)}
                        index={getIndex()}
                        showArtwork
                        onPress={() => {
                            console.debug(`Skipping to index ${index}`)
                            useSkip.mutate(index);
                        }}
                        onLongPress={drag}
                        isNested
                    />
                )
            }}
        />
    )
}