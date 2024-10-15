import { fetchServer } from "../../queries/functions/storage";
import { JellyfinCredentials } from "../../types/jellyfin-credentials";
import * as Keychain from "react-native-keychain"



export const mutateServerCredentials = async (credentials: JellyfinCredentials) => {        
    return Keychain.setInternetCredentials((await fetchServer()).url, credentials.username, credentials.accessToken!);
}