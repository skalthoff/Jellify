import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import { fetchCredentials } from "./functions/keychain"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "../../enums/async-storage-keys";
import { fetchServerUrl } from "./functions/storage";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: async () => {
        return fetchCredentials(await fetchServerUrl())
    }
});