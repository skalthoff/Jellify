import { Api, Jellyfin } from "@jellyfin/sdk";
import { getDeviceNameSync, getUniqueIdSync } from "react-native-device-info";
import { name, version } from "../package.json"
import { capitalize } from "lodash";

export const client : Jellyfin  = new Jellyfin({
    clientInfo: {
        name: capitalize(name),
        version: version
    },
    deviceInfo: {
        name: getDeviceNameSync(),
        id: getUniqueIdSync()
    }
});

export function buildApiClient (serverUrl : string): Api {
    let jellyfin = new Jellyfin(client);
    return jellyfin.createApi(serverUrl);
} 