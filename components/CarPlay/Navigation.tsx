import { CarPlay, TabBarTemplate } from 'react-native-carplay'
import CarPlayHome from './Home'
import CarPlayDiscover from './Discover'
import uuid from 'react-native-uuid'

const CarPlayNavigation: TabBarTemplate = new TabBarTemplate({
	id: uuid.v4(),
	title: 'Tabs',
	templates: [CarPlayHome(), CarPlayDiscover()],
	onTemplateSelect(template, e) {
		if (template) CarPlay.pushTemplate(template, true)
	},
})

export default CarPlayNavigation
