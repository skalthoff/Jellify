import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteAlbums, fetchFavoriteArtists, fetchFavoriteTracks, fetchUserData } from "./functions/favorites";

export const useFavoriteArtists = () => useQuery({
    queryKey: [QueryKeys.FavoriteArtists],
    queryFn: () => {

        return fetchFavoriteArtists()
    }
});

export const useFavoriteAlbums = () => useQuery({
    queryKey: [QueryKeys.FavoriteAlbums],
    queryFn: () => {

        return fetchFavoriteAlbums()
    }
});

export const useFavoriteTracks = () => useQuery({
    queryKey: [QueryKeys.FavoriteTracks],
    queryFn: () => fetchFavoriteTracks()
});

export const useUserData = (itemId: string) => useQuery({
    queryKey: [QueryKeys.UserData, itemId],
    queryFn: () => fetchUserData(itemId)
});