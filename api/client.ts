import { Api } from "@jellyfin/sdk/lib/api";
import { JellyfinInfo } from "./info";
import { JellifyServer } from "@/types/JellifyServer";
import { JellifyUser } from "@/types/JellifyUser";
import { storage } from '../constants/storage';
import { MMKVStorageKeys } from "@/enums/mmkv-storage-keys";
import uuid from 'react-native-uuid';
import { JellifyLibrary } from "@/types/JellifyLibrary";


export default class Client {
    static #instance: Client;

    public api : Api | undefined;
    public user : JellifyUser | undefined;
    public server : JellifyServer | undefined;
    public library : JellifyLibrary | undefined;
    public sessionId : string = uuid.v4();

    private constructor(
        api?: Api | undefined, 
        user?: JellifyUser | undefined, 
        server?: JellifyServer | undefined, 
        library?: JellifyLibrary | undefined
    ) {

        const userJson = storage.getString(MMKVStorageKeys.User)
        const serverJson = storage.getString(MMKVStorageKeys.Server);
        const libraryJson = storage.getString(MMKVStorageKeys.Library);

        
        if (api)
            this.api = api

        if (user)
            this.setAndPersistUser
        else if (userJson)
            this.user = JSON.parse(userJson)

        if (server) 
            this.setAndPersistServer(server)
        else if (serverJson)
            this.server = JSON.parse(serverJson);

        if (library)
            this.setAndPersistLibrary(library)
        else if (libraryJson)
            this.library = JSON.parse(libraryJson)
    }

    public static get instance(): Client {
        if (!Client.#instance) {
            Client.#instance = new Client();
        }

        return Client.#instance;
    }

    public static signOut(): void {
        if (!Client.#instance) {
            Client.instance;
        }

        Client.instance.removeCredentials()
    }

    private setAndPersistUser(user: JellifyUser) {
        this.user = user;

        // persist user details
        storage.set(MMKVStorageKeys.User, JSON.stringify(user));
    }

    private setAndPersistServer(server : JellifyServer) {
        this.server = server;

        storage.set(MMKVStorageKeys.Server, JSON.stringify(server));
    }

    private setAndPersistLibrary(library : JellifyLibrary) {
        this.library = library;

        storage.set(MMKVStorageKeys.Library, JSON.stringify(library))
    }

    private removeCredentials() {
        this.library = undefined;
        this.library = undefined;
        this.server = undefined;
        this.user = undefined;

        storage.delete(MMKVStorageKeys.Server)
        storage.delete(MMKVStorageKeys.Library)
        storage.delete(MMKVStorageKeys.User)
    }

    /**
     * Uses the jellifyClient to create a public Jellyfin API instance.
     * @param serverUrl The URL of the Jellyfin server
     * @returns 
     */
    public static setPublicApiClient(server : JellifyServer) : void {
        const api = JellyfinInfo.createApi(server.url);

        Client.#instance = new Client(api, undefined, server, undefined)
    }

    /**
     * 
     * @param serverUrl The URL of the Jellyfin server
     * @param accessToken The assigned accessToken for the Jellyfin user
     */
    public static setPrivateApiClient(server : JellifyServer, user : JellifyUser) : void {
        const api = JellyfinInfo.createApi(server.url, user.accessToken);

        Client.#instance = new Client(api, user, server, undefined)
    }
}