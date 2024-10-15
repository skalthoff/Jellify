import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/mutation-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../enums/async-storage-keys";

import { Jellyfin } from "@jellyfin/sdk";
import { client } from "../queries";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api"
import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { mutateServerCredentials } from "./functions/storage";
import { JellifyServer } from "../../types/JellifyServer";

export const serverUrlMutation = useMutation({
    mutationFn: async (serverUrl: string) => {

        console.log("Mutating server URL");

        if (!!!serverUrl)
            throw Error("Server URL is empty")

        let jellyfin = new Jellyfin(client);
        let api = jellyfin.createApi(serverUrl);

        console.log(`Created API client for ${api.basePath}`)
        return await getSystemApi(api).getPublicSystemInfo()
    },
    onSuccess: (publicSystemInfoResponse, serverUrl, context) => {
        if (!!!publicSystemInfoResponse.data.Version)
            throw new Error("Jellyfin instance did not respond");

        console.debug("REMOVE THIS::onSuccess variable", serverUrl);
        console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);

        // TODO: Store these along side address
        // TODO: Rename url to address
        
        let jellifyServer: JellifyServer = {
            url: serverUrl,
            name: publicSystemInfoResponse.data.ServerName!,
            version: publicSystemInfoResponse.data.Version!,
            startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
        }
        return AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, JSON.stringify(jellifyServer));
    },
    onError: (error: Error) => {
        console.error("An error occurred connecting to the Jellyfin instance", error);
    }
});

export const credentials = useMutation({
    mutationKey: [MutationKeys.Credentials],
    mutationFn: async (credentials: JellyfinCredentials) => {
        mutateServerCredentials(credentials)
    },
});