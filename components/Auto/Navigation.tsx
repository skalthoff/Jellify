import { TabBarTemplate } from 'react-native-carplay'
import CarPlayHome from './Home'
import CarPlayDiscover from './Discover'
import uuid from 'react-native-uuid'
import { JellifyUser } from '../../types/JellifyUser'

const CarPlayNavigation = (user: JellifyUser) =>
	new TabBarTemplate({
		id: uuid.v4(),
		title: 'Tabs',
		templates: [CarPlayHome(user), CarPlayDiscover],
		onTemplateSelect(template, e) {},
	})

export default CarPlayNavigation
