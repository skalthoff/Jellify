import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteAlbums, fetchFavoriteArtists, fetchFavoriteTracks, fetchUserData } from "./functions/favorites";

export const useFavoriteArtists = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteArtists, api, libraryId],
    queryFn: () => {

        return fetchFavoriteArtists(api, libraryId)
    }
});

export const useFavoriteAlbums = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteAlbums, api, libraryId],
    queryFn: ({ queryKey }) => {

        return fetchFavoriteAlbums(api, libraryId)
    }
});

export const useFavoriteTracks = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteTracks, api, libraryId],
    queryFn: ({ queryKey }) => {

        return fetchFavoriteTracks(api, libraryId)
    }
});

export const useUserData = (api: Api, itemId: string) => useQuery({
    queryKey: [QueryKeys.UserData, api, itemId],
    queryFn: ({ queryKey }) => {

        return fetchUserData(api, itemId)
    }
})