import { Jellyfin } from "@jellyfin/sdk"
import { useQuery } from "@tanstack/react-query";
import { getDeviceNameSync, getUniqueIdSync } from "react-native-device-info"
import { QueryKeys } from "../enums/query-keys";
import { useServerUrl } from "./queries/storage";
import { useCredentials } from "./queries/keychain";
import { SharedWebCredentials } from "react-native-keychain";

let clientName : string = require('root-require')('./package.json').name
let clientVersion : string = require('root-require')('./package.json').version

export const client : Jellyfin  = new Jellyfin({
    clientInfo: {
        name: clientName,
        version: clientVersion
    },
    deviceInfo: {
        name: getDeviceNameSync(),
        id: getUniqueIdSync()
    }
});

export const useApi = useQuery({
    queryKey: [QueryKeys.Api],
    queryFn: () => {
        let credentials = useCredentials.data!
        return client.createApi(credentials.server, credentials.password);
    }
})