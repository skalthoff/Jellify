import { QueryKeys } from '../../enums/query-keys'
import Client from '../../api/client'
import { CarPlay, ListTemplate } from 'react-native-carplay'
import { queryClient } from '../../constants/query-client'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import RecentTracksTemplate from './RecentTracks'
import RecentArtistsTemplate from './RecentArtists'
import uuid from 'react-native-uuid'
import { JellifyUser } from '../../types/JellifyUser'

const CarPlayHome = (user: JellifyUser) =>
	new ListTemplate({
		id: uuid.v4(),
		title: 'Home',
		tabTitle: 'Home',
		tabSystemImageName: 'music.house.fill',
		sections: [
			{
				header: `Hi, ${Client.user ?? 'there'}`,
				items: [],
			},
			{
				header: 'Recents',
				items: [
					{ id: QueryKeys.RecentlyPlayedArtists, text: 'Recent Artists' },
					{ id: QueryKeys.RecentlyPlayed, text: 'Play it again' },
				],
			},
			{
				header: 'Frequents',
				items: [
					{ id: QueryKeys.FrequentArtists, text: 'Most Played' },
					{ id: QueryKeys.FrequentlyPlayed, text: 'On Repeat' },
				],
			},
		],
		onItemSelect: async ({ index }) => {
			console.debug(`Home item selected`)

			switch (index) {
				case 0: {
					const artists =
						queryClient.getQueryData<BaseItemDto[]>([
							QueryKeys.RecentlyPlayedArtists,
						]) ?? []
					CarPlay.pushTemplate(RecentArtistsTemplate(artists))
					break
				}
				case 1: {
					const items =
						queryClient.getQueryData<BaseItemDto[]>([QueryKeys.RecentlyPlayed]) ?? []
					CarPlay.pushTemplate(RecentTracksTemplate(items))
					break
				}
				case 2: {
					const artists =
						queryClient.getQueryData<BaseItemDto[]>([QueryKeys.FrequentArtists]) ?? []
					CarPlay.pushTemplate(RecentArtistsTemplate(artists))
					break
				}
				case 3: {
					const items =
						queryClient.getQueryData<BaseItemDto[]>([QueryKeys.FrequentlyPlayed]) ?? []
					CarPlay.pushTemplate(RecentTracksTemplate(items))
					break
				}
			}
		},
	})

export default CarPlayHome
