import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { ListItem, XStack, YGroup } from 'tamagui'

interface ListGroupProps {
	items: BaseItemDto[] | undefined
}

export default function ListGroup({ items }: ListGroupProps): React.JSX.Element {
	return (
		<YGroup>
			{items?.map((item) => {
				<YGroup.Item>
					<ListItem>
						<XStack></XStack>
					</ListItem>
				</YGroup.Item>
			})}
		</YGroup>
	)
}
