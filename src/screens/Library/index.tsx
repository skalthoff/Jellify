import React from 'react'
import LibraryScreen from '../../components/Library/component'
import { PlaylistScreen } from '../Playlist'
import AddPlaylist from './add-playlist'
import DeletePlaylist from './delete-playlist'
import { ArtistScreen } from '../Artist'
import { useTheme } from 'tamagui'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AlbumScreen from '../Album'
import LibraryStackParamList from './types'
import { LibraryTabProps } from '../Tabs/types'
import { LibraryProvider } from '../../providers/Library'
import { LibrarySortAndFilterProvider } from '../../providers/Library/sorting-filtering'

const Stack = createNativeStackNavigator<LibraryStackParamList>()

export default function LibraryStack({ route, navigation }: LibraryTabProps): React.JSX.Element {
	const theme = useTheme()

	return (
		<LibrarySortAndFilterProvider>
			<LibraryProvider>
				<Stack.Navigator initialRouteName='LibraryScreen'>
					<Stack.Screen
						name='LibraryScreen'
						component={LibraryScreen}
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
