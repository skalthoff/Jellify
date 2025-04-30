import { isUndefined } from 'lodash'
import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'
import Client from '../api/client'

interface JellifyContext {
	loggedIn: boolean
	setLoggedIn: React.Dispatch<SetStateAction<boolean>>
}

const JellifyContextInitializer = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(
		!isUndefined(Client) &&
			!isUndefined(Client.api) &&
			!isUndefined(Client.user) &&
			!isUndefined(Client.server) &&
			!isUndefined(Client.library),
	)

	return {
		loggedIn,
		setLoggedIn,
	}
}

const JellifyContext = createContext<JellifyContext>({
	loggedIn: false,
	setLoggedIn: () => {},
})

export const JellifyProvider: ({ children }: { children: ReactNode }) => React.JSX.Element = ({
	children,
}: {
	children: ReactNode
}) => {
	const { loggedIn, setLoggedIn } = JellifyContextInitializer()

	return (
		<JellifyContext.Provider
			value={{
				loggedIn,
				setLoggedIn,
			}}
		>
			{children}
		</JellifyContext.Provider>
	)
}

export const useJellifyContext = () => useContext(JellifyContext)
