import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchCredentials } from "./functions/keychain"
import { fetchServerUrl } from "./functions/storage";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {

        let serverUrl = await fetchServerUrl();
        return await fetchCredentials(serverUrl);
    }
});