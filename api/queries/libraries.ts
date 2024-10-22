import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchMusicLibraries } from "./functions/libraries";
import { Api } from "@jellyfin/sdk";

export const useLibraries = (api: Api) => useQuery({
    queryKey: [QueryKeys.Libraries, api],
    queryFn: ({ queryKey }) => fetchMusicLibraries(queryKey[1] as Api)
});
