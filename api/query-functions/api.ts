import { Api } from "@jellyfin/sdk";
import { client } from "../queries";



export const createPublicApi: (serverUrl: string) => Api = (serverUrl) => {
    return client.createApi(serverUrl);
}