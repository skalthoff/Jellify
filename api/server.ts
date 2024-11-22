import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import { buildApiClient } from "./client";

export const serverMutation = async (serverUrl: string) => {
    
    console.log("Mutating server URL");

    if (!!!serverUrl)
        throw Error("Server URL is empty")

    const api = buildApiClient(serverUrl);

    console.log(`Created API client for ${api.basePath}`)
    return await getSystemApi(api).getPublicSystemInfo();
}