import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteAlbums, fetchFavoriteArtists, fetchFavoritePlaylists, fetchFavoriteTracks, fetchUserData } from "./functions/favorites";

export const useFavoriteArtists = () => useQuery({
    queryKey: [QueryKeys.FavoriteArtists],
    queryFn: () => fetchFavoriteArtists()
});

export const useFavoriteAlbums = () => useQuery({
    queryKey: [QueryKeys.FavoriteAlbums],
    queryFn: () => fetchFavoriteAlbums()
});

export const useFavoritePlaylists = () => useQuery({
    queryKey: [QueryKeys.FavoritePlaylists],
    queryFn: () => fetchFavoritePlaylists()
});

export const useFavoriteTracks = () => useQuery({
    queryKey: [QueryKeys.FavoriteTracks],
    queryFn: () => fetchFavoriteTracks()
});