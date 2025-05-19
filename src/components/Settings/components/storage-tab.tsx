import { SafeAreaView } from 'react-native-safe-area-context'
import SettingsListGroup from './settings-list-group'
import { SwitchWithLabel } from '../../Global/helpers/switch-with-label'
import { useSettingsContext } from '../../../providers/Settings'
import { useNetworkContext } from '../../../providers/Network'
import { Picker } from '@react-native-picker/picker'

export default function StorageTab(): React.JSX.Element {
	const { autoDownload, setAutoDownload, downloadQuality, setDownloadQuality } =
		useSettingsContext()
	const { downloadedTracks, storageUsage } = useNetworkContext()

	return (
		<SafeAreaView>
			<SettingsListGroup
				settingsList={[
					{
						title: 'Usage',
						subTitle: `${downloadedTracks?.length ?? '0'} ${
							downloadedTracks?.length === 1 ? 'song' : 'songs'
						} in your pocket`,
						iconName: 'harddisk',
						iconColor: '$borderColor',
					},
					{
						title: 'Automatically Cache Tracks',
						subTitle: 'Download tracks as they are played',
						iconName: autoDownload ? 'cloud-download' : 'cloud-off-outline',
						iconColor: autoDownload ? '$success' : '$borderColor',
						children: (
							<SwitchWithLabel
								size={'$2'}
								label={autoDownload ? 'Enabled' : 'Disabled'}
								checked={autoDownload}
								onCheckedChange={() => setAutoDownload(!autoDownload)}
							/>
						),
					},
					{
						title: 'Download Quality',
						subTitle: `${downloadQuality} kbps`,
						iconName: 'speedometer',
						iconColor: '$borderColor',
						children: (
							<Picker
								selectedValue={downloadQuality}
								style={{ height: 50, width: 150 }}
								onValueChange={(value) => setDownloadQuality(value)}
							>
								<Picker.Item label='64 kbps' value={64} />
								<Picker.Item label='128 kbps' value={128} />
								<Picker.Item label='192 kbps' value={192} />
								<Picker.Item label='320 kbps' value={320} />
							</Picker>
						),
					},
				]}
			/>
		</SafeAreaView>
	)
}
