import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { ListTemplate } from 'react-native-carplay'

const RecentTracksTemplate = (items: BaseItemDto[]) =>
	new ListTemplate({
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

export default RecentTracksTemplate
