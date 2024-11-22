import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums/query-keys";
import { createApi } from "./queries/functions/api";

export const useApi = (serverUrl?: string, username?: string, password?: string, accessToken?: string) => useQuery({
    queryKey: [QueryKeys.Api, serverUrl, username, password, accessToken],
    queryFn: ({ queryKey }) => createApi(serverUrl, username, password, accessToken),
    gcTime: 1000,
    refetchInterval: false
})