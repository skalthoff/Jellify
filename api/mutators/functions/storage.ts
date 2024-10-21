import { fetchServer } from "../../queries/functions/storage";
import { JellyfinCredentials } from "../../types/jellyfin-credentials";
import * as Keychain from "react-native-keychain"
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import { JellifyServer } from "../../../types/JellifyServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { buildApiClient } from "../../client";
import _ from "lodash";

interface ServerMutationParams {
    serverUrl: string,
}

export const serverMutation = async (serverUrl: string) => {
    
    console.log("Mutating server URL");

    if (!!!serverUrl)
        throw Error("Server URL is empty")

    const api = buildApiClient(serverUrl);

    console.log(`Created API client for ${api.basePath}`)
    return await getSystemApi(api).getPublicSystemInfo();
}

export const mutateServer = async (server: JellifyServer | undefined) => {
    return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, JSON.stringify(server));
}

export const mutateServerCredentials = async (credentials?: JellyfinCredentials) => {        

    if (!_.isUndefined(credentials)) {
        console.log("Setting Jellyfin credentials")
        return await Keychain.setInternetCredentials((await fetchServer()).url, credentials.username, credentials.accessToken!);
    }

    console.log("Resetting Jellyfin credentials")
    return await Keychain.resetInternetCredentials((await fetchServer()).url);
}