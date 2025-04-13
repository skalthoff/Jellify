import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { ListTemplate } from 'react-native-carplay'

const RecentArtistsTemplate = (items: BaseItemDto[]) =>
	new ListTemplate({
		id: 'Recent Artists',
		sections: [
			{
				items:
					items?.map((item) => {
						return {
							id: item.Id!,
							text: item.Name ?? 'Untitled',
						}
					}) ?? [],
			},
		],
		onItemSelect: async (item) => {},
	})

export default RecentArtistsTemplate
