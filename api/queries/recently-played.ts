import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchRecentlyPlayed } from "./functions/recents";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api"
import Client from "../client";

export const useRecentlyPlayed = () => useQuery({
    queryKey: [QueryKeys.RecentlyPlayed],
    queryFn: () => {

        return fetchRecentlyPlayed()
    }
});

export const useRecentlyPlayedArtists = () => useQuery({
    queryKey: [QueryKeys.RecentlyPlayedArtists],
    queryFn: () => {
        return fetchRecentlyPlayed()
            .then((tracks) => {
                return getItemsApi(Client.instance.api!)
                    .getItems({ 
                        ids: tracks.map(track => track.ArtistItems![0].Id!) 
                    })
                    .then((recentArtists) => {
                        return recentArtists.data.Items!
                    });
            });
    }
});