import { CarPlay, TabBarTemplate } from 'react-native-carplay'
import CarPlayHome from './Home'
import CarPlayDiscover from './Discover'
import uuid from 'react-native-uuid'
import CarPlayNowPlaying from './NowPlaying'
import { Platform } from 'react-native'

const CarPlayNavigation = () =>
	new TabBarTemplate({
		id: uuid.v4(),
		title: 'Tabs',
		templates: [CarPlayHome(), CarPlayDiscover()],
		onTemplateSelect(template, e) {},
		onDidAppear: () => {
			if (Platform.OS === 'ios') CarPlay.pushTemplate(CarPlayNowPlaying())
		},
	})

export default CarPlayNavigation
