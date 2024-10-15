import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../../enums/async-storage-keys"
import _ from "lodash";


export const fetchServerUrl : () => Promise<string | null> = async () => {

    console.log("Attempting to fetch server address from storage");
    
    let url = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl)!;

    if (_.isNull(url)) 
        Promise.reject("Stored server address was null");

    return url;
}