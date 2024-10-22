import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums/query-keys";
import { createApi, createPublicApi } from "./queries/functions/api";

export const usePublicApi = (serverUrl: string) => useQuery({
    queryKey: [QueryKeys.PublicApi, { serverUrl }],
    queryFn: createPublicApi
});

export const useApi = () => useQuery({
    queryKey: [QueryKeys.Api],
    queryFn: createApi
})