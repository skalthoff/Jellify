import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchCredentials } from "./functions/keychain"
import { fetchServerUrl } from "./functions/storage";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {

        try {
            let serverUrl = await fetchServerUrl();
            return await fetchCredentials(serverUrl);
        } catch(error: any) {
            console.error("Exception occurred using credentials", error);
            throw new Error(`Unable to use server credentials: ${error}`)
        }
    }
});