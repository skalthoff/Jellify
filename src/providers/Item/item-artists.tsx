import { createContext, useEffect, useRef } from 'react'
import { useJellifyContext } from '..'
import { QueryKeys } from '../../enums/query-keys'
import { fetchItem } from '../../api/queries/item'
import { queryClient } from '../../constants/query-client'

interface ItemArtistContext {
	artistId: string | undefined
}

const ItemArtistContext = createContext<ItemArtistContext>({
	artistId: undefined,
})

export const ItemArtistProvider: ({
	artistId,
}: {
	artistId: string | undefined
}) => React.JSX.Element = ({ artistId }) => {
	const { api } = useJellifyContext()

	const prefetchedContext = useRef<Record<string, true>>({})

	useEffect(() => {
		// Fail fast if we don't have an artist ID to work with
		if (!artistId) return

		const effectSig = artistId

		// If we've already warmed the cache for this artist, return
		if (prefetchedContext.current[effectSig]) return

		prefetchedContext.current[effectSig] = true

		console.debug(`Warming context cache for artist ${artistId}`)
		/**
		 * Store queryable of artist item
		 */
		queryClient.ensureQueryData({
			queryKey: [QueryKeys.ArtistById, artistId],
			queryFn: () => fetchItem(api, artistId!),
		})
	}, [api, artistId])

	return <ItemArtistContext.Provider value={{ artistId }} />
}
