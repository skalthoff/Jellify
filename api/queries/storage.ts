import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../enums/async-storage-keys";
import { QueryKeys } from "../enums/query-keys";


export const useServerUrl: UseQueryResult<string> = useQuery({
    queryKey: [QueryKeys.ServerUrl],
    queryFn: (() => {
        return AsyncStorage.getItem(AsyncStorageKeys.ServerUrl);
    })
});
