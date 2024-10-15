import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchServerUrl } from "./functions/storage";
import _ from "lodash";
import * as Keychain from "react-native-keychain"

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {

        console.log("Attempting to use stored credentials");

        let serverUrl = await fetchServerUrl;

        console.debug(`REMOVE THIS::Server Url ${serverUrl}`);

        return Keychain.getInternetCredentials(serverUrl!);
    }
});