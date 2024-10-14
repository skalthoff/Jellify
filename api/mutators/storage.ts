import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/mutation-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../enums/async-storage-keys";

import { Jellyfin } from "@jellyfin/sdk";
import { client } from "../queries";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api"
import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { mutateServerCredentials } from "./functions/storage";

export const useServerUrl = useMutation({
    mutationFn: async (serverUrl: string | undefined) => {

        if (!!!serverUrl)
            throw Error("Server URL was empty")

        let jellyfin = new Jellyfin(client);
        let api = jellyfin.createApi(serverUrl);
        return await getSystemApi(api).getPublicSystemInfo()
    },
    onSuccess: (publicSystemInfoResponse, serverUrl, context) => {
        if (!!!publicSystemInfoResponse.data.Version)
            throw new Error("Unable to connect to Jellyfin Server");
        return AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, serverUrl!);
    }
});

export const credentials = useMutation({
    mutationKey: [MutationKeys.Credentials],
    mutationFn: async (credentials: JellyfinCredentials) => {
        mutateServerCredentials(credentials)
    },
});