import { Image } from 'expo-image'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { ListTemplate } from 'react-native-carplay'
import { getImageApi } from '@jellyfin/sdk/lib/utils/api'
import Client from '../../api/client'
import uuid from 'react-native-uuid'

interface ListItemImage {
	id: string
	url: string | null
}

export default async function ListItemTemplate(
	items: BaseItemDto[] | undefined,
	onItemSelect: (item: { templateId: string; index: number }) => Promise<void>,
): Promise<ListTemplate> {
	if (items) {
		const itemImages: ListItemImage[] = await Promise.all(
			items.map(async (item): Promise<ListItemImage> => {
				return Image.getCachePathAsync(
					getImageApi(Client.api!).getItemImageUrlById(
						item.Type === 'Audio' ? item.AlbumId! : item.Id!,
					),
				).then((imageUri) => {
					if (imageUri) {
						console.debug(imageUri)
						return {
							id: item.Id!,
							url: imageUri,
						} as ListItemImage
					} else {
						return {
							id: item.Id!,
							url: getImageApi(Client.api!).getItemImageUrlById(
								item.Type === 'Audio' ? item.AlbumId! : item.Id!,
							),
						}
					}
				})
			}),
		)

		return new ListTemplate({
			id: uuid.v4(),
			sections: [
				{
					items:
						items?.map((item) => {
							return {
								templateId: item.Id!,
								text: item.Name ?? 'Untitled',
								image: {
									uri:
										itemImages.find((itemImage) => itemImage.id === item.Id)!
											.url ?? undefined,
								},
							}
						}) ?? [],
				},
			],
			onItemSelect,
		})
	} else {
		return new ListTemplate({})
	}
}
