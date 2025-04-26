import React from 'react'
import { XStack, getToken } from 'tamagui'
import PlayPauseButton from './buttons'
import Icon from '../../../components/Global/helpers/icon'
import { getProgress, seekBy, skipToNext } from 'react-native-track-player/lib/src/trackPlayer'
import { usePlayerContext } from '../../../player/provider'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import { useQueueContext } from '../../../player/queue-provider'

export default function Controls(): React.JSX.Element {
	const { width } = useSafeAreaFrame()

	const { useSeekTo } = usePlayerContext()

	const { usePrevious } = useQueueContext()

	return (
		<XStack alignItems='center' justifyContent='space-evenly' marginVertical={'$2'}>
			<Icon
				color={getToken('$color.amethyst')}
				name='rewind-15'
				onPress={() => seekBy(-15)}
			/>

			<Icon
				color={getToken('$color.amethyst')}
				name='skip-previous'
				onPress={() => usePrevious.mutate()}
				large
			/>

			{/* I really wanted a big clunky play button */}
			<PlayPauseButton size={width / 5} />

			<Icon
				color={getToken('$color.amethyst')}
				name='skip-next'
				onPress={() => skipToNext()}
				large
			/>

			<Icon
				color={getToken('$color.amethyst')}
				name='fast-forward-15'
				onPress={() => seekBy(15)}
			/>
		</XStack>
	)
}
