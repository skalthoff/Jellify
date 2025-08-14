import ItemContext from '../../components/Context'
import { ContextProps } from '../types'

export default function ItemContextScreen({ route }: ContextProps): React.JSX.Element {
	return (
		<ItemContext
			item={route.params.item}
			isNested={route.params.isNested}
			navigation={route.params.navigation}
		/>
	)
}
