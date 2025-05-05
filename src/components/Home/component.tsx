import { StackParamList } from '../types'
import { ScrollView, RefreshControl } from 'react-native'
import { YStack, XStack, Separator } from 'tamagui'
import RecentArtists from './helpers/recent-artists'
import RecentlyPlayed from './helpers/recently-played'
import { useHomeContext } from './provider'
import { H3 } from '../Global/helpers/text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import FrequentArtists from './helpers/frequent-artists'
import FrequentlyPlayedTracks from './helpers/frequent-tracks'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useJellifyContext } from '../provider'
import Icon from '../Global/helpers/icon'
export function ProvidedHome({
	navigation,
}: {
	navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
	const { user } = useJellifyContext()
	const { refreshing: refetching, onRefresh } = useHomeContext()
	const insets = useSafeAreaInsets()

	return (
		<ScrollView
			contentInsetAdjustmentBehavior='automatic'
			refreshControl={<RefreshControl refreshing={refetching} onRefresh={onRefresh} />}
			removeClippedSubviews // Save memory usage
		>
			<YStack alignContent='flex-start'>
				<XStack margin={'$2'} alignItems='center' justifyContent='space-between'>
					<H3>{`Hi, ${user?.name ?? 'there'}`}</H3>
					<Icon
						name='download-outline'
						small
						onPress={() => navigation.navigate('Storage')}
						title='View Downloads'
					/>
				</XStack>

				<Separator marginVertical={'$2'} />

				<RecentArtists navigation={navigation} />

				<Separator marginVertical={'$3'} />

				<RecentlyPlayed navigation={navigation} />

				<Separator marginVertical={'$3'} />

				<FrequentArtists navigation={navigation} />

				<Separator marginVertical={'$3'} />

				<FrequentlyPlayedTracks navigation={navigation} />
			</YStack>
		</ScrollView>
	)
}
