import { Api } from "@jellyfin/sdk";
import { client } from "../../queries";
import { fetchCredentials } from "./storage";

/**
 * A promise to build an authenticated Jellyfin API client
 * @returns A Promise of the authenticated Jellyfin API client or a rejection
 */
export const createApi: () => Promise<Api> = async () => {
    return fetchCredentials()
        .then(credentials => {
            return client.createApi(credentials.server, credentials.password);
        }).catch((rejection) => {
            return Promise.reject(rejection)
        })
}

export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}