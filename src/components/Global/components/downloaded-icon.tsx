import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { useNetworkContext } from '../../../providers/Network'
import { Spacer } from 'tamagui'
import Icon from './icon'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export default function DownloadedIcon({ item }: { item: BaseItemDto }) {
	const { downloadedTracks } = useNetworkContext()

	const isDownloaded = downloadedTracks?.find(
		(downloadedTrack) => downloadedTrack.item.Id === item.Id,
	)

	return isDownloaded ? (
		<Animated.View entering={FadeIn} exiting={FadeOut}>
			<Icon small name='download-circle' color={'$success'} flex={1} />
		</Animated.View>
	) : (
		<Spacer flex={0.5} />
	)
}
