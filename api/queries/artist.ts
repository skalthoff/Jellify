import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { Api } from "@jellyfin/sdk"
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api"
import { BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models"

export const useArtistAlbums = (artistId: string, api: Api) => useQuery({
    queryKey: [QueryKeys.ArtistAlbums, artistId, api],
    queryFn: ({ queryKey }) => {
        return getItemsApi(queryKey[2] as Api).getItems({
            includeItemTypes: [BaseItemKind.MusicAlbum],
            recursive: true,
            excludeItemIds: [queryKey[1] as string],
            sortBy: [
                ItemSortBy.PremiereDate,
                ItemSortBy.ProductionYear,
                ItemSortBy.SortName
            ],
            sortOrder: [SortOrder.Descending],
            artistIds: [queryKey[1] as string],
        })
        .then((response) => {
            return response.data.Items ? response.data.Items! : [];
        })
    }
})


export const useArtistFeaturedOnAlbums = (artistId: string, api: Api) => useQuery({
    queryKey: [QueryKeys.ArtistFeaturedAlbums, artistId, api],
    queryFn: ({ queryKey }) => {
        return getItemsApi(queryKey[2] as Api).getItems({
            includeItemTypes: [BaseItemKind.MusicAlbum],
            recursive: true,
            excludeItemIds: [queryKey[1] as string],
            sortBy: [
                ItemSortBy.PremiereDate,
                ItemSortBy.ProductionYear,
                ItemSortBy.SortName
            ],
            sortOrder: [ SortOrder.Descending ],
            contributingArtistIds: [queryKey[1] as string]
        })
        .then((response) => {
            return response.data.Items ? response.data.Items! : [];
        })
    }
})