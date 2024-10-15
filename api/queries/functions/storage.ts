import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../../enums/async-storage-keys"
import _ from "lodash";


export const fetchServerUrl : () => Promise<string> | never = async () => {

    console.log("Attempting to fetch server address from storage");
    
    let url = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl)!;

    if (_.isNull(url)) 
        throw Error("Server URL was null")

    return url;
}