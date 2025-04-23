import React, { createContext, ReactNode, useContext } from 'react'
import { JellifyDownload } from '../../types/JellifyDownload'
import {
	useMutation,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query'
import { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models'
import { mapDtoToTrack } from '../../helpers/mappings'
import { downloadJellyfinFile, getAudioCache } from './offlineModeUtils'
import { QueryKeys } from '../../enums/query-keys'

interface NetworkContext {
	useDownload: UseMutationResult<string, Error, BaseItemDto, unknown>
	useDownloads: UseQueryResult<JellifyDownload[]>
}

const NetworkContextInitializer = () => {
	const queryClient = useQueryClient()

	const useDownload = useMutation({
		mutationFn: (trackItem: BaseItemDto) => {
			const track = mapDtoToTrack(trackItem)

			return downloadJellyfinFile(
				track.url,
				track.item.Id!,
				track.title ?? 'Untitled Track',
				queryClient,
			)
		},
		onSuccess: (data, variables) => {
			console.debug(`Downloaded ${variables.Id} successfully`)

			return data
		},
	})

	const useDownloads = useQuery({
		queryKey: [QueryKeys.AudioCache],
		queryFn: () => getAudioCache(),
	})

	return {
		useDownload,
		useDownloads,
	}
}

const NetworkContext = createContext<NetworkContext>({
	useDownload: {
		mutate: () => {},
		mutateAsync: async () => '',
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
	useDownloads: {
		promise: new Promise(() => [] as JellifyDownload[]),
		isFetched: false,
		isFetchedAfterMount: false,
		data: undefined,
		error: null,
		isError: false,
		isPaused: false,
		isPending: true,
		isSuccess: false,
		isLoadingError: false,
		isRefetchError: false,
		errorUpdatedAt: 0,
		errorUpdateCount: 0,
		dataUpdatedAt: 0,
		isFetching: true,
		isLoading: true,
		isInitialLoading: true,
		isRefetching: false,
		isStale: true,
		refetch: () => new Promise(() => [] as JellifyDownload[]),
		isPlaceholderData: false,
		status: 'pending',
		fetchStatus: 'fetching',
		failureCount: 0,
		failureReason: null,
	},
})

export const NetworkContextProvider: ({
	children,
}: {
	children: ReactNode
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
	const { useDownload, useDownloads } = NetworkContextInitializer()

	return (
		<NetworkContext.Provider
			value={{
				useDownload,
				useDownloads,
			}}
		>
			{children}
		</NetworkContext.Provider>
	)
}

export const useNetworkContext = () => useContext(NetworkContext)
