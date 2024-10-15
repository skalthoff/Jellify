import AsyncStorage from "@react-native-async-storage/async-storage"
import { AsyncStorageKeys } from "../../../enums/async-storage-keys"
import _ from "lodash";


export const fetchServerUrl : Promise<string> = new Promise(async (resolve, reject) => {

    console.log("Attempting to fetch server address from storage");
    
    let url = await AsyncStorage.getItem(AsyncStorageKeys.ServerUrl)!;

    if (_.isEmpty(url))
        reject("No stored server address exists");

    resolve(url!);
});