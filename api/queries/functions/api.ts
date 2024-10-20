import { Api } from "@jellyfin/sdk";
import { fetchCredentials } from "./storage";
import { client } from "../../client";
import _ from "lodash";

/**
 * A promise to build an authenticated Jellyfin API client
 * @returns A Promise of the authenticated Jellyfin API client or a rejection
 */
export const createApi: () => Promise<Api> = async () => {
    return fetchCredentials()
        .then(credentials => {

            if (!_.isUndefined(credentials))
                throw new Error("No credentials exist for the current user")
            
            return client.createApi(credentials!.server, credentials!.password);

        }).catch((rejection) => {
            return Promise.reject(rejection)
        })
}

export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}