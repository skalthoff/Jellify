import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ItemRow from '../../Global/components/item-row'
import { FlashList } from '@shopify/flash-list'
import { PlayerParamList } from '../../../screens/Player/types'
import { RouteProp } from '@react-navigation/native'
import navigate from '../../../../navigation'

interface MultipleArtistsProps {
	navigation: NativeStackNavigationProp<PlayerParamList, 'MultipleArtists'>
	route: RouteProp<PlayerParamList, 'MultipleArtists'>
}
export default function MultipleArtists({
	navigation,
	route,
}: MultipleArtistsProps): React.JSX.Element {
	return (
		<FlashList
			data={route.params.artists}
			renderItem={({ item: artist }) => (
				<ItemRow
					circular
					key={artist.Id}
					item={artist}
					queueName={''}
					onPress={() => {
						navigation.goBack() // Dismiss multiple artists modal
						navigation.goBack() // Dismiss player modal
						navigate('Tabs', {
							screen: 'Library',
							param: {
								screen: 'Artist',
								params: {
									artist,
								},
							},
						})
					}}
				/>
			)}
		/>
	)
}
