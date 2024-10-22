import { Api } from "@jellyfin/sdk";
import { fetchCredentials } from "./storage";
import { client } from "../../client";
import _ from "lodash";

/**
 * A promise to build an authenticated Jellyfin API client
 * @returns A Promise of the authenticated Jellyfin API client or a rejection
 */
export const createApi: () => Promise<Api> = () => new Promise(async (resolve, reject) => {
    return fetchCredentials()
        .then(credentials => {

            if (!_.isUndefined(credentials))
                reject("No credentials exist for the current user")
            
            resolve(client.createApi(credentials!.server, credentials!.password));

        }).catch((rejection) => {
            reject(rejection)
        })
});

export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}