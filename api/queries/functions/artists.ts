import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";
import Client from "../../client";
import { fetchItems } from './items';

export function fetchRecentlyPlayedArtists(page?: number, limit: number = 50, sortOrder: typeof SortOrder.Ascending | typeof SortOrder.Descending = SortOrder.Descending): Promise<BaseItemDto[]> {
    // First get recently played tracks
    return fetchItems({
        itemType: BaseItemKind.Audio,
        page,
        limit: limit * 2, // Get more tracks to ensure enough unique artists
        sortBy: [ItemSortBy.DatePlayed],
        sortOrder: [sortOrder]
    })
    .then(response => {
        const tracks = response.items;
        // Get unique artist IDs from the tracks
        const artistIds = [...new Set(tracks
            .filter(track => track.ArtistItems && track.ArtistItems.length > 0)
            .map(track => track.ArtistItems![0].Id!)
        )];

        // Then fetch the artist details
        return getItemsApi(Client.api!)
            .getItems({
                ids: artistIds.slice(0, limit) // Limit to requested number of artists
            })
            .then(artistResponse => artistResponse.data.Items ?? []);
    });
}