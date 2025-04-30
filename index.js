import 'react-native-gesture-handler'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { PlaybackService } from './src/player/service'
import TrackPlayer from 'react-native-track-player'

import JellifyAuto from './src/components/auto'
import Client from './src/api/client'

// Initialize API client instance
/* eslint-disable @typescript-eslint/no-unused-expressions */
Client.instance

console.debug('Created Jellify client')

AppRegistry.registerComponent(appName, () => App)
AppRegistry.registerComponent(`${appName}-Auto`, () => {
	console.debug(`Registering Auto component`)
	return JellifyAuto
})

// Register RNTP playback service for remote controls
TrackPlayer.registerPlaybackService(() => PlaybackService)
