import { isUndefined } from 'lodash'
import { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { CarPlay } from 'react-native-carplay'
import CarPlayNavigation from './CarPlay/Navigation'
import { Platform } from 'react-native'
import { JellifyLibrary } from '../types/JellifyLibrary'
import { JellifyServer } from '../types/JellifyServer'
import { JellifyUser } from '../types/JellifyUser'
import { storage } from '../constants/storage'
import { MMKVStorageKeys } from '../enums/mmkv-storage-keys'
import { Api } from '@jellyfin/sdk/lib/api'
import { JellyfinInfo } from '../api/info'
import uuid from 'react-native-uuid'

interface JellifyContext {
	loggedIn: boolean
	api: Api | undefined
	server: JellifyServer | undefined
	user: JellifyUser | undefined
	library: JellifyLibrary | undefined
	triggerAuth: boolean
	carPlayConnected: boolean
	sessionId: string
	setServer: React.Dispatch<SetStateAction<JellifyServer | undefined>>
	setUser: React.Dispatch<SetStateAction<JellifyUser | undefined>>
	setLibrary: React.Dispatch<SetStateAction<JellifyLibrary | undefined>>
	setTriggerAuth: React.Dispatch<SetStateAction<boolean>>
	signOut: () => void
}

const JellifyContextInitializer = () => {
	const userJson = storage.getString(MMKVStorageKeys.User)
	const serverJson = storage.getString(MMKVStorageKeys.Server)
	const libraryJson = storage.getString(MMKVStorageKeys.Library)

	const sessionId = uuid.v4()

	const [api, setApi] = useState<Api | undefined>(undefined)
	const [server, setServer] = useState<JellifyServer | undefined>(
		serverJson ? JSON.parse(serverJson) : undefined,
	)
	const [user, setUser] = useState<JellifyUser | undefined>(
		userJson ? JSON.parse(userJson) : undefined,
	)
	const [library, setLibrary] = useState<JellifyLibrary | undefined>(
		libraryJson ? JSON.parse(libraryJson) : undefined,
	)

	const [triggerAuth, setTriggerAuth] = useState<boolean>(true)

	const [loggedIn, setLoggedIn] = useState<boolean>(false)

	const [carPlayConnected, setCarPlayConnected] = useState(CarPlay ? CarPlay.connected : false)

	const signOut = () => {
		setServer(undefined)
		setUser(undefined)
		setLibrary(undefined)
	}

	useEffect(() => {
		if (!isUndefined(server) && !isUndefined(user))
			setApi(JellyfinInfo.createApi(server.url, user.accessToken))
		else if (!isUndefined(server)) setApi(JellyfinInfo.createApi(server.url))
		else setApi(undefined)

		setLoggedIn(!isUndefined(server) && !isUndefined(user) && !isUndefined(library))
	}, [server, user, library])

	useEffect(() => {
		if (server) storage.set(MMKVStorageKeys.Server, JSON.stringify(server))
	}, [server])

	useEffect(() => {
		if (user) storage.set(MMKVStorageKeys.User, JSON.stringify(user))
	}, [user])

	useEffect(() => {
		if (library) storage.set(MMKVStorageKeys.Library, JSON.stringify(library))
	}, [library])

	useEffect(() => {
		function onConnect() {
			setCarPlayConnected(true)

			if (user && api) {
				CarPlay.setRootTemplate(CarPlayNavigation(api, user, sessionId))

				if (Platform.OS === 'ios') {
					CarPlay.enableNowPlaying(true) // https://github.com/birkir/react-native-carplay/issues/185
				}
			}
		}

		function onDisconnect() {
			setCarPlayConnected(false)
		}

		if (CarPlay) {
			CarPlay.registerOnConnect(onConnect)
			CarPlay.registerOnDisconnect(onDisconnect)
			return () => {
				CarPlay.unregisterOnConnect(onConnect)
				CarPlay.unregisterOnDisconnect(onDisconnect)
			}
		}
	})

	return {
		loggedIn,
		api,
		server,
		user,
		library,
		triggerAuth,
		sessionId,
		setServer,
		setUser,
		setLibrary,
		setTriggerAuth,
		carPlayConnected,
		signOut,
	}
}

const JellifyContext = createContext<JellifyContext>({
	loggedIn: false,
	api: undefined,
	server: undefined,
	user: undefined,
	library: undefined,
	triggerAuth: false,
	sessionId: '',
	setServer: () => {},
	setUser: () => {},
	setLibrary: () => {},
	setTriggerAuth: () => {},
	carPlayConnected: false,
	signOut: () => {},
})

/**
 * Top level provider for Jellify. Provides the {@link JellifyContext} to all children, containing
 * whether the user is logged in, and whether the carplay is connected
 * @param children The children to render
 * @returns The {@link JellifyProvider} component
 */
export const JellifyProvider: ({ children }: { children: ReactNode }) => React.JSX.Element = ({
	children,
}: {
	children: ReactNode
}) => {
	const context = JellifyContextInitializer()

	return <JellifyContext.Provider value={context}>{children}</JellifyContext.Provider>
}

export const useJellifyContext = () => useContext(JellifyContext)
