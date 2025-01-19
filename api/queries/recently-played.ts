import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchRecentlyPlayed, fetchRecentlyPlayedArtists } from "./functions/recents";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api"
import Client from "../client";

export const useRecentlyPlayed = () => useQuery({
    queryKey: [QueryKeys.RecentlyPlayed],
    queryFn: () => fetchRecentlyPlayed()
});

export const useRecentlyPlayedArtists = () => useQuery({
    queryKey: [QueryKeys.RecentlyPlayedArtists],
    queryFn: () => fetchRecentlyPlayedArtists()
});