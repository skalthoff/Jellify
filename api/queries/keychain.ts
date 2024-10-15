import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchServerUrl } from "./functions/storage";
import _ from "lodash";
import * as Keychain from "react-native-keychain"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../enums/async-storage-keys";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {

        console.log("Attempting to use stored credentials");

        let serverUrl = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl);

        console.debug(`REMOVE THIS::Server Url ${serverUrl}`);

        if (!_.isNull(serverUrl))
            return Keychain.getInternetCredentials(serverUrl!);

        return new Error("Unable to retrieve credentials without a server URL")
    }
});