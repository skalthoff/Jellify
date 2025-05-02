import { XStack, YStack } from 'tamagui'
import Icon from '../helpers/icon'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamList } from '../../types'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import Track, { TrackProps } from './track'

interface DraggableTrackProps extends TrackProps {
	drag: () => void
	onRemove: () => void
	isActive: boolean
	onLongPress?: () => void
}

export default function DraggableTrack({
	track,
	navigation,
	drag,
	queue,
	index,
	onPress,
	isNested,
	onRemove,
	isActive,
	onLongPress,
}: DraggableTrackProps): React.JSX.Element {
	return (
		<XStack alignItems='center' onLongPress={() => drag()}>
			<YStack paddingHorizontal={'$2'}>
				<Icon name='drag' />
			</YStack>

			<Track
				queue={queue}
				navigation={navigation}
				track={track}
				index={index}
				showArtwork
				onPress={isActive ? undefined : onPress}
				onLongPress={onLongPress}
				isNested={isNested}
				showRemove={true}
				onRemove={onRemove}
			/>
		</XStack>
	)
}
