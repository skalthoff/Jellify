import { createContext } from 'react'
import { useJellifyContext } from '..'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { fetchItem } from '../../api/queries/item'

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

	/**
	 * Store queryable of artist item
	 */
	useQuery({
		queryKey: [QueryKeys.ArtistById, artistId],
		queryFn: () => fetchItem(api, artistId!),
		enabled: !!artistId,
	})

	return <ItemArtistContext.Provider value={{ artistId }} />
}
