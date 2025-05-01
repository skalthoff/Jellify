import Client from '../../../api/client'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { getImageApi } from '@jellyfin/sdk/lib/utils/api'
import { Image } from 'expo-image'
import { isUndefined } from 'lodash'
import { getToken, getTokenValue, FontSizeTokens } from 'tamagui'

interface ImageProps {
	item: BaseItemDto
	circular?: boolean | undefined
	width?: FontSizeTokens | undefined
	height?: FontSizeTokens | undefined
}

export default function ItemImage({
	item,
	circular,
	width,
	height,
}: ImageProps): React.JSX.Element {
	return (
		<Image
			source={getImageApi(Client.api!).getItemImageUrlById(item.Id!)}
			style={{
				borderRadius: circular
					? width
						? width
						: getTokenValue('$12') + getToken('$5')
					: getTokenValue('$2'),
				width: !isUndefined(width) ? width : getToken('$12') + getToken('$5'),
				height: !isUndefined(height) ? height : getToken('$12') + getToken('$5'),
				alignSelf: 'center',
			}}
		/>
	)
}
