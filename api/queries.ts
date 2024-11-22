import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../enums/query-keys";
import { createApi, createPublicApi } from "./queries/functions/api";

export const usePublicApi = () => useQuery({
    queryKey: [QueryKeys.PublicApi],
    queryFn: createPublicApi
});

export const useApi = () => useQuery({
    queryKey: [QueryKeys.Api],
    queryFn: createApi,
    gcTime: 1000,
    refetchInterval: false
})