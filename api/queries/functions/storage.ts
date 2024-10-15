import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../../enums/async-storage-keys"
import _ from "lodash";
import * as Keychain from "react-native-keychain"


export const fetchCredentials : () => Promise<Keychain.SharedWebCredentials> = () => new Promise(async (resolve, reject) => {

    console.log("Attempting to use stored credentials");

    let serverUrl = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl);

    console.debug(`REMOVE THIS::Server Url ${serverUrl}`);

    if (!_.isNull(serverUrl))
        Keychain.getInternetCredentials(serverUrl!)
            .then((keychain) => {
                if (!keychain)
                    reject(new Error("Unable to retrieve credentials for server address"))

                resolve(keychain as Keychain.SharedWebCredentials)
            })

    throw new Error("Unable to retrieve credentials without a server URL");
});

export const fetchServerUrl : () => Promise<string> = () => new Promise(async (resolve, reject) => {

    console.log("Attempting to fetch server address from storage");
    
    let url = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl);

    if (_.isNull(url))
        throw new Error("No stored server address exists");

    resolve(url);
});