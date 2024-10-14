import * as Keychain from "react-native-keychain"

export const fetchCredentials = (serverUrl: string) => {
    return Keychain.getInternetCredentials(serverUrl)
            .then((keychain) => {
                if (!keychain) 
                    throw new Error("Jellyfin server credentials not stored in keychain");

                return keychain as Keychain.SharedWebCredentials
            });   
}