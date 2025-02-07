import { Api } from "@jellyfin/sdk";
import { JellyfinInfo } from "../../info";
import _ from "lodash";

export function createApi(serverUrl?: string, username?: string, password?: string, accessToken?: string): Promise<Api> {
    return new Promise(async (resolve, reject) => {

        if (_.isUndefined(serverUrl)) {
            console.info("Server Url doesn't exist yet")
            return reject("Server Url doesn't exist");
        }

        if (!_.isUndefined(accessToken)) {
            console.info("Creating API with accessToken")
            return resolve(JellyfinInfo.createApi(serverUrl, accessToken));
        }
                

        if (_.isUndefined(username) && _.isUndefined(password)) {

            console.info("Creating public API for server url")
            return resolve(JellyfinInfo.createApi(serverUrl));
        }

        console.log("Signing into Jellyfin")
        let authResult = await JellyfinInfo.createApi(serverUrl).authenticateUserByName(username!, password);

        if (authResult.data.AccessToken) {
            console.info("Signed into Jellyfin successfully")
            return resolve(JellyfinInfo.createApi(serverUrl, authResult.data.AccessToken));
        }

        return reject("Unable to sign in");
    });
}