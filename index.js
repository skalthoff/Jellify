import 'react-native-gesture-handler'
import { AppRegistry, Platform } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { PlaybackService } from './src/player/service'
import TrackPlayer from 'react-native-track-player'
import Client from './src/api/client'

// Initialize API client instance
/* eslint-disable @typescript-eslint/no-unused-expressions */
Client.instance

console.debug('Created Jellify client')

// Register the main app component
AppRegistry.registerComponent(appName, () => App)

// Register RNTP playback service for remote controls
TrackPlayer.registerPlaybackService(() => PlaybackService)

// Ensure the app is initialized even when launched directly in CarPlay
if (Platform.OS === 'ios') {
	AppRegistry.registerComponent('CarPlay', () => App)
}
