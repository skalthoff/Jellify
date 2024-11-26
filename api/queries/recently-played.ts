import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchRecentlyPlayed } from "./functions/recents";
import { getArtistsApi, getItemsApi } from "@jellyfin/sdk/lib/utils/api"

export const useRecentlyPlayed = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.RecentlyPlayed, api, libraryId],
    queryFn: ({ queryKey }) => fetchRecentlyPlayed(queryKey[1] as Api, queryKey[2] as string)
})

export const useRecentlyPlayedArtists = (api: Api, libraryId: string) => useQuery({
    queryKey: [QueryKeys.RecentlyPlayedArtists, api, libraryId],
    queryFn: ({ queryKey }) => {
        return fetchRecentlyPlayed(queryKey[1] as Api, queryKey[2] as string)
            .then((tracks) => {
                return getItemsApi(api)
                    .getItems({ 
                        ids: tracks.map(track => track.ArtistItems![0].Id!) 
                    })
                    .then((recentArtists) => {
                        return recentArtists.data.Items!
                    })
            })
    }
})