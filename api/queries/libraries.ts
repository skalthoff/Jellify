import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchMusicLibraries, fetchPlaylistLibrary } from "./functions/libraries";

export const useMusicLibraries = () => useQuery({
    queryKey: [QueryKeys.Libraries],
    queryFn: () => fetchMusicLibraries()
});

export const usePlaylistLibrary = () => useQuery({
    queryKey: [QueryKeys.Playlist],
    queryFn: () => fetchPlaylistLibrary()
});