import { Jellyfin } from "@jellyfin/sdk"
import { Query, useQuery } from "@tanstack/react-query";
import { getDeviceNameSync, getUniqueIdSync } from "react-native-device-info"
import { QueryKeys } from "../enums/query-keys";
import { name, version } from "../package.json"
import { createApi, createPublicApi } from "./queries/functions/api";
import { fetchServerUrl } from "./queries/functions/storage";

export const client : Jellyfin  = new Jellyfin({
    clientInfo: {
        name: name,
        version: version
    },
    deviceInfo: {
        name: getDeviceNameSync(),
        id: getUniqueIdSync()
    }
});

export const usePublicApi = (serverUrl: string) => useQuery({
    queryKey: [QueryKeys.PublicApi, serverUrl],
    queryFn: ({ queryKey }) => {
        createPublicApi(queryKey[1])
    }
})

export const useApi = () => useQuery({
    queryKey: [QueryKeys.Api],
    queryFn: async ({ queryKey }) => {
        createApi();
    }
})