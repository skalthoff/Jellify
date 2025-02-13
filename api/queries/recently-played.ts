import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchRecentlyPlayed, fetchRecentlyPlayedArtists } from "./functions/recents";

export const useRecentlyPlayed = () => useQuery({
    queryKey: [QueryKeys.RecentlyPlayed],
    queryFn: () => fetchRecentlyPlayed()
});

export const useRecentlyPlayedArtists = (offset?: number | undefined) => useQuery({
    queryKey: [QueryKeys.RecentlyPlayedArtists, offset],
    queryFn: () => fetchRecentlyPlayedArtists(offset)
});