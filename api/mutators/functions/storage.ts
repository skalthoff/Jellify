import { fetchServerUrl } from "../../queries/functions/storage";
import { JellyfinCredentials } from "../../types/jellyfin-credentials";
import * as Keychain from "react-native-keychain"



export const mutateServerCredentials = async (credentials: JellyfinCredentials) => {        
    return Keychain.setInternetCredentials(await fetchServerUrl, credentials.username, credentials.accessToken!);
}