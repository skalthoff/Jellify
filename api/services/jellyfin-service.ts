import { Api, Jellyfin } from "@jellyfin/sdk";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"
import { getDeviceNameSync, getUniqueIdSync } from "react-native-device-info";
import { ArtistModel } from "../../models/ArtistModel";
import * as Keychain from "react-native-keychain"

let clientName : string = require('root-require')('./package.json').name
let clientVersion : string = require('root-require')('./package.json').version

export class JellyfinService {

    private static _instance: JellyfinService;

    private api?: Api;

    // TODO: This should read in auth details when constructed?
    private constructor() {};

    private client : Jellyfin  = new Jellyfin({
        clientInfo: {
            name: clientName,
            version: clientVersion
        },
        deviceInfo: {
            name: getDeviceNameSync(),
            id: getUniqueIdSync()
        }
    })

    public static get instance() {

        // TODO: Determine this makes singleton correctly
        return this._instance || (this._instance = new this())
    }

    public static get api() : Api {
        return this.instance.api!
    }

    public initConnection(serverUrl: string) : void {
        JellyfinService.instance.api = JellyfinService.instance.client.createApi(serverUrl);
    }

    public storeAuthDetails(serverUrl: string, username: string, sessionToken: string) : Promise<false | Keychain.Result> {
        // Set sessionToken in API
        JellyfinService.instance.api = JellyfinService.instance.client.createApi(serverUrl, sessionToken);

        // Store in encrypted local storage
        return Keychain.setInternetCredentials(serverUrl, username, sessionToken)

        // TODO: Refresh on reopen? 
    }

    public async getArtistById(artistJellyfinId: string) : Promise<ArtistModel> {
        
        return getItemsApi(JellyfinService.instance.api!)
            .getItems({ ids: [artistJellyfinId]})

            // TODO: Error handling here
            .then((response) => response.data.Items!.at(0)!)
            .then(item => new ArtistModel(item))
    }
}