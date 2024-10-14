import { Api } from "@jellyfin/sdk";
import { client } from "../../queries";
import { fetchCredentials } from "./keychain";


export const createApi: (serverUrl: string) => Promise<Api> = async (serverUrl) => {
    let credentials = await fetchCredentials(serverUrl)
    return client.createApi(credentials.server, credentials.password);
}

export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}