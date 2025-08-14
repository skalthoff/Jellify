import Tracks from '../../components/Tracks/component'
import { TracksProps } from '../types'

export default function TracksScreen({ route }: TracksProps): React.JSX.Element {
	return (
		<Tracks
			tracks={route.params.tracks}
			queue={route.params.queue}
			fetchNextPage={route.params.fetchNextPage}
			hasNextPage={route.params.hasNextPage}
		/>
	)
}
