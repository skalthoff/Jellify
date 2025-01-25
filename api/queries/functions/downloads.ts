import Client from "../../../api/client";
import { getLibraryApi } from "@jellyfin/sdk/lib/utils/api";

export async function downloadTrack(itemId: string) : Promise<void> {
    getLibraryApi(Client.api!)
        .getDownload({
            itemId
        }, {
            'responseType': 'blob'
        })
}