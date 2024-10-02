import { UseQueryResult, useQuery } from "@tanstack/react-query"
import * as Keychain from "react-native-keychain"
import { ArtistModel } from "../../models/ArtistModel"
import { Api } from "@jellyfin/sdk"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../enums/async-storage-keys"
import { QueryKeys } from "../enums/query-keys"
import { useServerUrl } from "./storage"

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: () => {
        return Keychain.getInternetCredentials(useServerUrl.data!)
            .then((keychain) => {
                if (!keychain) 
                    throw new Error("Jellyfin server credentials not stored in keychain");

                return keychain as Keychain.SharedWebCredentials
            });        
    }
});