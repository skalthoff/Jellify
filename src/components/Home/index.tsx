import { ScrollView, RefreshControl } from 'react-native'
import { YStack, Separator, getToken } from 'tamagui'
import RecentArtists from './helpers/recent-artists'
import RecentlyPlayed from './helpers/recently-played'
import { useHomeContext } from '../../providers/Home'
import FrequentArtists from './helpers/frequent-artists'
import FrequentlyPlayedTracks from './helpers/frequent-tracks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useJellifyContext } from '../../providers'
import { usePreventRemove } from '@react-navigation/native'

export function ProvidedHome(): React.JSX.Element {
	usePreventRemove(true, () => {})
	const { user } = useJellifyContext()
	const { refreshing: refetching, onRefresh } = useHomeContext()
	const insets = useSafeAreaInsets()

	return (
		<ScrollView
			contentInsetAdjustmentBehavior='automatic'
			contentContainerStyle={{
				marginVertical: getToken('$4'),
			}}
			refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} />}
			removeClippedSubviews // Save memory usage
		>
			<YStack alignContent='flex-start'>
				<RecentArtists />

				<Separator marginVertical={'$3'} />

				<RecentlyPlayed />

				<Separator marginVertical={'$3'} />

				<FrequentArtists />

				<Separator marginVertical={'$3'} />

				<FrequentlyPlayedTracks />
			</YStack>
		</ScrollView>
	)
}
