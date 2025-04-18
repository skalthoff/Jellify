import Icon from '../../../components/Global/helpers/icon'
import Track from '../../../components/Global/components/track'
import { StackParamList } from '../../../components/types'
import { usePlayerContext } from '../../../player/provider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { Separator } from 'tamagui'
import DragList from 'react-native-draglist'

export default function Queue({
	navigation,
}: {
	navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
	const { width } = useSafeAreaFrame()
	const {
		playQueue,
		queue,
		useClearQueue,
		useRemoveFromQueue,
		useReorderQueue,
		useSkip,
		nowPlaying,
	} = usePlayerContext()

	navigation.setOptions({
		headerRight: () => {
			return (
				<Icon
					name='notification-clear-all'
					onPress={() => {
						useClearQueue.mutate()
					}}
				/>
			)
		},
	})

	const scrollIndex = playQueue.findIndex(
		(queueItem) => queueItem.item.Id! === nowPlaying!.item.Id!,
	)

	return (
		<DragList
			contentInsetAdjustmentBehavior='automatic'
			data={playQueue}
			// dragHitSlop={{ left: -50 }} // https://github.com/computerjazz/react-native-draggable-flatlist/issues/336
			extraData={nowPlaying}
			// enableLayoutAnimationExperimental
			getItemLayout={(data, index) => ({
				length: width / 9,
				offset: (width / 9) * index,
				index,
			})}
			initialScrollIndex={scrollIndex !== -1 ? scrollIndex : 0}
			ItemSeparatorComponent={() => <Separator />}
			// itemEnteringAnimation={FadeIn}
			// itemExitingAnimation={FadeOut}
			// itemLayoutAnimation={SequencedTransition}
			keyExtractor={({ item }, index) => {
				return `${index}-${item.Id}`
			}}
			numColumns={1}
			renderItem={({ item: queueItem, onDragStart, onDragEnd, isActive }) => (
				<Track
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
					queue={queue}
					navigation={navigation}
					track={queueItem.item}
					index={playQueue.indexOf(queueItem)}
					showArtwork
					onPress={() => {
						useSkip.mutate(playQueue.indexOf(queueItem))
					}}
					isNested
					showRemove
					onRemove={() => {
						useRemoveFromQueue.mutate(playQueue.indexOf(queueItem))
					}}
				/>
			)}
		/>
	)
}
