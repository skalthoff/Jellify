import React, { createContext, ReactNode, useContext } from 'react'
import { JellifyDownload } from '../../types/JellifyDownload'
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { mapDtoToTrack } from '../../helpers/mappings'
import { getAudioCache, saveAudio } from './offlineModeUtils'
import { QueryKeys } from '../../enums/query-keys'

interface NetworkContext {
	useDownload: UseMutationResult<void, Error, BaseItemDto, unknown>
	downloadedTracks: JellifyDownload[] | undefined
	refetchDownloadedTracks: (
		options?: RefetchOptions,
	) => Promise<QueryObserverResult<JellifyDownload[], Error>>
}

const NetworkContextInitializer = () => {
	const queryClient = useQueryClient()

	const useDownload = useMutation({
		mutationFn: (trackItem: BaseItemDto) => {
			const track = mapDtoToTrack(trackItem)

			return saveAudio(track, queryClient, false)
		},
		onSuccess: (data, variables) => {
			console.debug(`Downloaded ${variables.Id} successfully`)

			refetchDownloadedTracks()
			return data
		},
	})

	const { data: downloadedTracks, refetch: refetchDownloadedTracks } = useQuery({
		queryKey: [QueryKeys.AudioCache],
		queryFn: getAudioCache,
		staleTime: 1000 * 60, // 1 minute
	})

	return {
		useDownload,
		downloadedTracks,
		refetchDownloadedTracks,
	}
}

const NetworkContext = createContext<NetworkContext>({
	useDownload: {
		mutate: () => {},
		mutateAsync: async () => {},
		data: undefined,
		error: null,
		variables: undefined,
		isError: false,
		isIdle: true,
		isPaused: false,
		isPending: false,
		isSuccess: false,
		status: 'idle',
		reset: () => {},
		context: {},
		failureCount: 0,
		failureReason: null,
		submittedAt: 0,
	},
	downloadedTracks: [],
	refetchDownloadedTracks: () => new Promise(() => [] as JellifyDownload[]),
})

export const NetworkContextProvider: ({
	children,
}: {
	children: ReactNode
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
	const { useDownload, downloadedTracks, refetchDownloadedTracks } = NetworkContextInitializer()

	return (
		<NetworkContext.Provider
			value={{
				useDownload,
				downloadedTracks,
				refetchDownloadedTracks,
			}}
		>
			{children}
		</NetworkContext.Provider>
	)
}

export const useNetworkContext = () => useContext(NetworkContext)
