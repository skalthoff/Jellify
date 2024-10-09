import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { getPlaylistsApi } from "@jellyfin/sdk/lib/utils/api/playlists-api"
import { useApi } from "../queries";


export const usePlaylists = useQuery({
    queryKey: [QueryKeys.Playlists],
    queryFn: () => {
        return getPlaylistsApi(useApi.data!)
    }
})