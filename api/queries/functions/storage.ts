import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../../enums/async-storage-keys"
import _ from "lodash";
import * as Keychain from "react-native-keychain"
import { JellifyServer } from "../../../types/JellifyServer";


export const fetchCredentials : () => Promise<Keychain.SharedWebCredentials | undefined> = () => new Promise(async (resolve, reject) => {

    console.log("Attempting to use stored credentials");

    let server = await fetchServer();

    if (_.isEmpty(server.url)) {
        console.warn("Unable to retrieve credentials without a server URL");
        resolve(undefined);
    }

    const keychain = await Keychain.getInternetCredentials(server.url!);

    if (!keychain) {
        console.warn("No keychain for server address - signin required");
        resolve(undefined);
    }

    console.log("Successfully retrieved keychain");
    resolve(keychain as Keychain.SharedWebCredentials)
});

export const fetchServer : () => Promise<JellifyServer> = () => new Promise(async (resolve, reject) => {

    console.log("Attempting to fetch server address from storage");
    
    let serverJson = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl);

    if (_.isEmpty(serverJson) || _.isNull(serverJson)) {
        console.warn("No stored server address exists");
        return reject(new Error("No stored server address exists"));
    }

    try {
        let server : JellifyServer = JSON.parse(serverJson) as JellifyServer;
        return resolve(server);
    } catch(error: any) {
        return Promise.reject(new Error(error));
    }
});