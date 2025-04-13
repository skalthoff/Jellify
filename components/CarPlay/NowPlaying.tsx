import { NowPlayingTemplate } from 'react-native-carplay'
import uuid from 'react-native-uuid'

const CarPlayNowPlaying = () =>
	new NowPlayingTemplate({
		id: uuid.v4(),
	})

export default CarPlayNowPlaying
