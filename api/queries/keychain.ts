import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchCredentials } from "./functions/keychain"
import { fetchServerUrl } from "./functions/storage";
import _ from "lodash";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {

        let serverUrl = await fetchServerUrl();

        if (_.isNull(serverUrl)) {
            Promise.reject("Can't fetch credentials if server address doesn't exist yet :|");
            return;
        }

        return await fetchCredentials(serverUrl);
    }
});