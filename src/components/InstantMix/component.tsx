import { InstantMixProps } from '../../screens/types'
import { FlatList } from 'react-native'
import Track from '../Global/components/track'
import { Separator } from 'tamagui'

export default function InstantMix({ route }: InstantMixProps): React.JSX.Element {
	const { mix } = route.params

	return (
		<FlatList
			data={mix}
			ItemSeparatorComponent={() => <Separator />}
			renderItem={({ item, index }) => (
				<Track
					showArtwork
					track={item}
					index={index}
					queue={'Instant Mix'}
					tracklist={mix}
				/>
			)}
		/>
	)
}
