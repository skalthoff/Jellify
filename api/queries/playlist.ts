import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPlaylists } from "./functions/playlists";

export const useUserPlaylists = () => useQuery({
    queryKey: [QueryKeys.UserPlaylists],
    queryFn: () => fetchUserPlaylists()
});

