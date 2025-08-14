import Artists from '../../Artists/component'
import {
	useArtistPageParamsContext,
	useArtistsInfiniteQueryContext,
} from '../../../providers/Library'

export default function ArtistsTab(): React.JSX.Element {
	const artistsInfiniteQuery = useArtistsInfiniteQueryContext()
	const artistPageParams = useArtistPageParamsContext()

	return (
		<Artists
			artistsInfiniteQuery={artistsInfiniteQuery}
			showAlphabeticalSelector={true}
			artistPageParams={artistPageParams}
		/>
	)
}
