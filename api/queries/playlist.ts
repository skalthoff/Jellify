import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "./functions/playlists";
import { fetchFavoritePlaylists } from "./functions/favorites";
import { ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models";

export const useFavoritePlaylists = () => useQuery({
    queryKey: [QueryKeys.FavoritePlaylists],
    queryFn: () => fetchFavoritePlaylists()
});

export const useUserPlaylists = (sortBy: ItemSortBy[] = []) => useQuery({
    queryKey: [QueryKeys.UserPlaylists, sortBy],
    queryFn: () => fetchUserPlaylists(sortBy)
});

