import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/mutation-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../enums/async-storage-keys";

import * as Keychain from "react-native-keychain"
import { useServerUrl } from "../queries/storage";
import { Jellyfin } from "@jellyfin/sdk";
import { client } from "../queries";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api"
import { JellyfinCredentials } from "../types/jellyfin-credentials";

export const serverUrl = useMutation({
    mutationKey: [MutationKeys.ServerUrl],
    mutationFn: (serverUrl: string) => {
        let jellyfin = new Jellyfin(client);

        let api = jellyfin.createApi(serverUrl);

        return getSystemApi(api).getPublicSystemInfo()
    },
    onSuccess: (publicSystemInfoResponse, serverUrl, context) => {

        if (!!!publicSystemInfoResponse.data.Version)
            throw new Error("Unable to connect to Jellyfin Server");

        return AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, serverUrl);
    }
});

export const credentials = useMutation({
    mutationKey: [MutationKeys.Credentials],
    mutationFn: (credentials: JellyfinCredentials) => {
        return Keychain.setInternetCredentials(useServerUrl.data!, credentials.username, credentials.accessToken);
    },
});