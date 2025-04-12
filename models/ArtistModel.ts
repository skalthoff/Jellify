import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'

export class ArtistModel {
	name?: string | undefined | null

	constructor(itemDto: BaseItemDto) {
		this.name = itemDto.Name
	}
}
