import { InstantMixProps } from '../types'
import { FlatList } from 'react-native'
import Track from '../Global/components/track'

export default function InstantMix({ route, navigation }: InstantMixProps): React.JSX.Element {
	const { mix } = route.params

	return (
		<FlatList
			data={mix}
			renderItem={({ item, index }) => (
				<Track
					showArtwork
					track={item}
					navigation={navigation}
					index={index}
					queue={'Instant Mix'}
				/>
			)}
		/>
	)
}
