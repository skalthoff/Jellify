import { Jellyfin } from "@jellyfin/sdk/lib/jellyfin";
import { fetchServer } from "../../queries/functions/storage";
import { JellyfinCredentials } from "../../types/jellyfin-credentials";
import * as Keychain from "react-native-keychain"
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import { client } from "../../queries";

export const serverMutation = async (serverUrl: string) => {
    
    console.log("Mutating server URL");

    if (!!!serverUrl)
        throw Error("Server URL is empty")

    let jellyfin = new Jellyfin(client);
    let api = jellyfin.createApi(serverUrl);

    console.log(`Created API client for ${api.basePath}`)
    return await getSystemApi(api).getPublicSystemInfo()
}

export const mutateServerCredentials = async (credentials: JellyfinCredentials) => {        
    return Keychain.setInternetCredentials((await fetchServer()).url, credentials.username, credentials.accessToken!);
}