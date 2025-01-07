import { QueryKeys } from "@/enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "./functions/playlists";

export const useUserPlaylists = (api: Api, userId: string, playlistLibraryId: string) => useQuery({
    queryKey: [QueryKeys.UserPlaylists, api, userId, playlistLibraryId],
    queryFn: ({ queryKey }) => {
        const api: Api = queryKey[1] as Api;
        const userId: string = queryKey[2] as string;
        const playlistLibraryId: string = queryKey[3] as string;

        return fetchUserPlaylists(api, userId, playlistLibraryId);
    }
})