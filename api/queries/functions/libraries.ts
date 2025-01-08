import { Api } from "@jellyfin/sdk";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { isUndefined } from "lodash";


export function fetchMusicLibraries(api: Api): Promise<BaseItemDto[]> {
    return new Promise(async (resolve, reject) => {
        console.debug("Fetching music libraries from Jellyfin");
        
        let libraries = await getItemsApi(api).getItems({ includeItemTypes: ['CollectionFolder'] });

        if (isUndefined(libraries.data.Items)) {
            console.warn("No libraries found on Jellyfin");
            return reject("No libraries found on Jellyfin");
        }

        let musicLibraries = libraries.data.Items!.filter(library => library.CollectionType == 'music');
        
        return resolve(musicLibraries);
    });
}

export function fetchPlaylistLibrary(api: Api): Promise<BaseItemDto> {
    return new Promise(async (resolve, reject) => {
        console.debug("Fetching playlist library from Jellyfin");
        
        let libraries = await getItemsApi(api).getItems({ includeItemTypes: ['ManualPlaylistsFolder'] });

        if (isUndefined(libraries.data.Items)) {
            console.warn("No playlist libraries found on Jellyfin");
            return reject("No playlist libraries found on Jellyfin");
        }

        console.debug("Playlist libraries", libraries.data.Items!)

        if (libraries.data.Items!.length > 1) {
            console.warn("Multiple playlist libraries detected")
            return reject("Multiple playlist libraries detected")
        }
        
        return resolve(libraries.data.Items![0]);
    })
}