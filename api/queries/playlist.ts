import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "./functions/playlists";
import { fetchFavoritePlaylists } from "./functions/favorites";

export const useFavoritePlaylists = () => useQuery({
    queryKey: [QueryKeys.FavoritePlaylists],
    queryFn: () => fetchFavoritePlaylists()
});

export const useUserPlaylists = () => useQuery({
    queryKey: [QueryKeys.UserPlaylists],
    queryFn: () => fetchUserPlaylists()
});

