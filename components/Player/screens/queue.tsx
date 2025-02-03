import Icon from "../../../components/Global/helpers/icon";
import Track from "../../../components/Global/components/track";
import { StackParamList } from "../../../components/types";
import { usePlayerContext } from "../../../player/provider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";
import { trigger } from "react-native-haptic-feedback";
import { getTokens } from "tamagui";
import { LinearTransition } from "react-native-reanimated";

export default function Queue({ navigation }: { navigation: NativeStackNavigationProp<StackParamList>}): React.JSX.Element {

    const { width } = useSafeAreaFrame();
    const { queue, useClearQueue, useRemoveFromQueue, useReorderQueue, useSkip, nowPlaying } = usePlayerContext();

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
            enableLayoutAnimationExperimental
            getItemLayout={(data, index) => (
                { length: width / 9, offset: width / 9 * index, index}
            )}
            initialScrollIndex={scrollIndex !== -1 ? scrollIndex: 0}
            itemEnteringAnimation={LinearTransition}
            itemExitingAnimation={LinearTransition}
            itemLayoutAnimation={LinearTransition}
            keyExtractor={({ item }, index) => {
                return `${index}-${item.Id}`
            }}
            numColumns={1}
            onDragEnd={({ data, from, to}) => {
                useReorderQueue.mutate({ newOrder: data, from, to });
            }}
            renderItem={({ item: queueItem, getIndex, drag, isActive }) => {

                const index = getIndex();

                return (
                    <Track
                        navigation={navigation}
                        track={queueItem.item}
                        index={getIndex()}
                        showArtwork
                        onPress={() => {
                            useSkip.mutate(index);
                        }}
                        onLongPress={() => {
                            trigger('impactLight');
                            drag();
                        }}
                        isNested
                        prependElement={(
                            <Icon 
                                small 
                                color={getTokens().color.amethyst.val} 
                                name="close-circle-outline" 
                                onPress={() => useRemoveFromQueue.mutate(index!)} 
                            />
                        )}
                    />
                )
            }}
        />
    )
}