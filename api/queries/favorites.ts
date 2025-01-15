import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteAlbums, fetchFavoriteArtists, fetchFavoriteTracks } from "./functions/favorites";

export const useFavoriteArtists = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteArtists, api, libraryId],
    queryFn: ({ queryKey }) => {
        const api: Api = queryKey[1] as Api;
        const libraryId : string = queryKey[2] as string;

        return fetchFavoriteArtists(api, libraryId)
    }
});

export const useFavoriteAlbums = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteAlbums, api, libraryId],
    queryFn: ({ queryKey }) => {
        const api: Api = queryKey[1] as Api;
        const libraryId : string = queryKey[2] as string;

        return fetchFavoriteAlbums(api, libraryId)
    }
});

export const useFavoriteTracks = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.FavoriteTracks, api, libraryId],
    queryFn: ({ queryKey }) => {
        const api: Api = queryKey[1] as Api;
        const libraryId : string = queryKey[2] as string;

        return fetchFavoriteTracks(api, libraryId)
    }
});