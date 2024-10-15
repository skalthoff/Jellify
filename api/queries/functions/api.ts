import { Api } from "@jellyfin/sdk";
import { client } from "../../queries";
import { fetchCredentials } from "./storage";

export const createApi: () => Promise<Api> = async () => {
    let credentials = await fetchCredentials()
    return client.createApi(credentials.server, credentials.password);
}

export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}