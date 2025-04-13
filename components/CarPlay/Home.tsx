import { QueryKeys } from '../../enums/query-keys'
import Client from '../../api/client'
import { CarPlay, ListTemplate } from 'react-native-carplay'
import { queryClient } from '../../constants/query-client'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import ListItemTemplate from './ListTemplate'
import TrackPlayer from 'react-native-track-player'
import { mapDtoToTrack } from '../../helpers/mappings'
import CarPlayNowPlaying from './NowPlaying'

const CarPlayHome: ListTemplate = new ListTemplate({
	id: 'Home',
	title: 'Home',
	tabTitle: 'Home',
	sections: [
		{
			header: `Hi ${Client.user?.name ?? 'there'}`,
			items: [
				{ id: QueryKeys.RecentlyPlayedArtists, text: 'Recent Artists' },
				{ id: QueryKeys.RecentlyPlayed, text: 'Recently Played' },
				{ id: QueryKeys.UserPlaylists, text: 'Your Playlists' },
			],
		},
	],
	onItemSelect: async ({ index }) => {
		console.debug(`Home item selected`)

		switch (index) {
			case 0: {
				const artists = queryClient.getQueryData<BaseItemDto[]>([
					QueryKeys.RecentlyPlayedArtists,
				])
				CarPlay.pushTemplate(await ListItemTemplate(artists, async () => {}))
				break
			}
			case 1: {
				const tracks = queryClient.getQueryData<BaseItemDto[]>([QueryKeys.RecentlyPlayed])
				CarPlay.pushTemplate(
					await ListItemTemplate(tracks, async (item) => {
						await TrackPlayer.setQueue(
							tracks?.map((track) => mapDtoToTrack(track)) ?? [],
						)

						await TrackPlayer.skip(
							tracks?.findIndex((track) => track.Id! === item.templateId) ?? 0,
						)

						await TrackPlayer.play()

						CarPlay.pushTemplate(CarPlayNowPlaying)
					}),
				)
				break
			}
			case 2: {
				const playlists = queryClient.getQueryData<BaseItemDto[]>([QueryKeys.UserPlaylists])
				CarPlay.pushTemplate(await ListItemTemplate(playlists, async () => {}))
				break
			}
		}
	},
})

export default CarPlayHome
