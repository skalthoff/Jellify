import { BaseItemDto, BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models'
import { createContext, ReactNode, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '../../enums/query-keys'
import { fetchMediaInfo } from '../../api/queries/media'
import { useJellifyContext } from '..'
import { useStreamingQualityContext } from '../Settings'
import { getQualityParams } from '../../utils/mappings'
import { fetchAlbumDiscs, fetchItem } from '../../api/queries/item'
import { getItemsApi } from '@jellyfin/sdk/lib/utils/api'
import { ItemArtistProvider } from './item-artists'

interface ItemContext {
	item: BaseItemDto
}

const ItemContext = createContext<ItemContext>({
	item: {},
})

interface ItemProviderProps {
	item: BaseItemDto
	children: ReactNode
}

/**
 * Performs a series of {@link useQuery} functions that store additional context
 * around the item being browsed, including
 *
 * - Artist(s)
 * - Album
 * - Track(s)
 *
 * This data is used throughout Jellify as additional {@link useQuery} hooks to
 * tap into this cache
 *
 * @param param0 Object containing the {@link BaseItemDto} and the child {@link ReactNode} to render
 * @returns
 */
export const ItemProvider: ({ item, children }: ItemProviderProps) => React.JSX.Element = ({
	item,
	children,
}) => {
	const { api, user } = useJellifyContext()

	const streamingQuality = useStreamingQualityContext()

	const { Id, Type, AlbumId, ArtistItems } = item

	const artistIds = ArtistItems?.map(({ Id }) => Id) ?? []

	/**
	 * Fetch and cache the media sources if this item is a track
	 */
	useQuery({
		queryKey: [QueryKeys.MediaSources, streamingQuality, Id],
		queryFn: () => fetchMediaInfo(api, user, getQualityParams(streamingQuality), Id!),
		staleTime: Infinity, // Don't refetch media info unless the user changes the quality
		enabled: !!Id && Type === BaseItemKind.Audio,
	})

	/**
	 * ...or store it as a queryable if the item is an artist
	 *
	 * Referenced later in the context sheet
	 */
	useQuery({
		queryKey: [QueryKeys.ArtistById, Id],
		queryFn: () => item,
		enabled: !!Id && Type === BaseItemKind.MusicArtist,
	})

	/**
	 * Fire query for a track's album...
	 *
	 * Referenced later in the context sheet
	 */
	useQuery({
		queryKey: [QueryKeys.Album, AlbumId],
		queryFn: () => fetchItem(api, item.AlbumId!),
		enabled: !!AlbumId && Type === BaseItemKind.Audio,
	})

	/**
	 * ...or store it if it is an album
	 *
	 * Referenced later in the context sheet
	 */
	useQuery({
		queryKey: [QueryKeys.Album, Id],
		queryFn: () => item,
		enabled: !!Id && Type === BaseItemKind.MusicAlbum,
	})

	/**
	 * Prefetch for an album's tracks
	 *
	 * Referenced later in the context sheet
	 */
	useQuery({
		queryKey: [QueryKeys.ItemTracks, Id],
		queryFn: () => fetchAlbumDiscs(api, item),
		enabled: !!Id && item.Type === BaseItemKind.MusicAlbum,
	})

	/**
	 * Fire query for a playlist's tracks
	 *
	 * Referenced later in the context sheet
	 */
	useQuery({
		queryKey: [QueryKeys.ItemTracks, Id],
		queryFn: () =>
			getItemsApi(api!)
				.getItems({ parentId: Id! })
				.then(({ data }) => {
					if (data.Items) return data.Items
					else return []
				}),
		enabled: !!Id && Type === BaseItemKind.Playlist,
	})

	return useMemo(
		() => (
			<ItemContext.Provider value={{ item }}>
				{artistIds.map((Id) => Id && <ItemArtistProvider artistId={Id} key={Id} />)}
				{children}
			</ItemContext.Provider>
		),
		[item],
	)
}
