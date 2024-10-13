import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../enums/async-storage-keys"
import _ from "lodash";


export const fetchServerUrl : () => Promise<string> = async () => {

    let url = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl)!;

    if (_.isNull(url)) 
        throw Error("Server URL was null")

    return url;
}