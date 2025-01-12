import { Api, Jellyfin } from "@jellyfin/sdk";
import { getDeviceNameSync, getUniqueIdSync } from "react-native-device-info";
import { name, version } from "../package.json"
import { capitalize } from "lodash";

/**
 * Client object that represents Jellify on the Jellyfin server.
 */
export const jellifyClient: Jellyfin = new Jellyfin({
    clientInfo: {
        name: capitalize(name),
        version: version
    },
    deviceInfo: {
        name: getDeviceNameSync(),
        id: getUniqueIdSync()
    }
});

/**
 * Uses the jellifyClient to create a public Jellyfin API instance.
 * @param serverUrl The URL of the Jellyfin server
 * @returns 
 */
export function buildPublicApiClient(serverUrl : string) : Api {
    return jellifyClient.createApi(serverUrl);
}

/**
 * 
 * @param serverUrl The URL of the Jellyfin server
 * @param accessToken The assigned accessToken for the Jellyfin user
 */
export function buildAuthenticatedApiClient(serverUrl: string, accessToken: string) : Api {
    return jellifyClient.createApi(serverUrl, accessToken);
}