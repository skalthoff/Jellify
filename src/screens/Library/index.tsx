import React, { useEffect } from 'react'
import Library from '../../components/Library/component'
import { PlaylistScreen } from '../Playlist'
import AddPlaylist from './add-playlist'
import DeletePlaylist from './delete-playlist'
import { ArtistScreen } from '../Artist'
import { useTheme } from 'tamagui'
import { LibraryProvider } from '../../providers/Library'
import { LibrarySortAndFilterProvider } from '../../providers/Library/sorting-filtering'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AlbumScreen from '../Album'
import LibraryStackParamList, { LibraryNavigation } from './types'
import { LibraryTabProps } from '../Tabs/types'
import { useIsFocused } from '@react-navigation/native'

const Stack = createNativeStackNavigator<LibraryStackParamList>()

export default function LibraryStack({ route, navigation }: LibraryTabProps): React.JSX.Element {
	const theme = useTheme()

	const isFocused = useIsFocused()

	useEffect(() => {
		if (!isFocused) return

		if (LibraryNavigation.album) {
			navigation.navigate('Library', {
				screen: 'Album',
				params: { album: LibraryNavigation.album },
			})
			LibraryNavigation.album = undefined
		}

		if (LibraryNavigation.artist) {
			navigation.navigate('Library', {
				screen: 'Artist',
				params: { artist: LibraryNavigation.artist },
			})
			LibraryNavigation.artist = undefined
		}

		if (LibraryNavigation.playlist) {
			navigation.navigate('Library', {
				screen: 'Playlist',
				params: { playlist: LibraryNavigation.playlist },
			})
			LibraryNavigation.playlist = undefined
		}
	}, [isFocused])

	return (
		<LibrarySortAndFilterProvider>
			<LibraryProvider>
				<Stack.Navigator initialRouteName='Library'>
					<Stack.Screen
						name='Library'
						component={Library}
						options={{
							title: 'Library',

							// I honestly don't think we need a header for this screen, given that there are
							// tabs on the top of the screen for navigating the library, but if we want one,
							// we can use the title above
							headerShown: false,
						}}
					/>

					<Stack.Screen
						name='Artist'
						component={ArtistScreen}
						options={({ route }) => ({
							title: route.params.artist.Name ?? 'Unknown Artist',
							headerTitleStyle: {
								color: theme.background.val,
							},
						})}
					/>

					<Stack.Screen
						name='Album'
						component={AlbumScreen}
						options={({ route }) => ({
							headerShown: true,
							title: route.params.album.Name ?? 'Untitled Album',
							headerTitleStyle: {
								color: theme.background.val,
							},
						})}
					/>

					<Stack.Screen
						name='Playlist'
						component={PlaylistScreen}
						options={({ route }) => ({
							headerShown: true,
							title: route.params.playlist.Name ?? 'Untitled Playlist',
							headerTitleStyle: {
								color: theme.background.val,
							},
						})}
					/>

					<Stack.Group
						screenOptions={{
							presentation: 'formSheet',
							sheetAllowedDetents: 'fitToContents',
						}}
					>
						<Stack.Screen
							name='AddPlaylist'
							component={AddPlaylist}
							options={{
								title: 'Add Playlist',
							}}
						/>

						<Stack.Screen
							name='DeletePlaylist'
							component={DeletePlaylist}
							options={{
								title: 'Delete Playlist',
							}}
						/>
					</Stack.Group>
				</Stack.Navigator>
			</LibraryProvider>
		</LibrarySortAndFilterProvider>
	)
}
