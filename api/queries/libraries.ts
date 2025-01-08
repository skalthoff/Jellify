import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { fetchMusicLibraries, fetchPlaylistLibrary } from "./functions/libraries";

export const useMusicLibraries = (api: Api) => useQuery({
    queryKey: [QueryKeys.Libraries, api],
    queryFn: async ({ queryKey }) => await fetchMusicLibraries(queryKey[1] as Api)
});

export const usePlaylistLibrary = (api: Api) => useQuery({
    queryKey: [QueryKeys.Playlist, api],
    queryFn: async ({ queryKey }) => await fetchPlaylistLibrary(queryKey[1] as Api)
})