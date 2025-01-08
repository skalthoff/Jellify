import { Api } from "@jellyfin/sdk";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import _ from "lodash";


export function fetchMusicLibraries(api: Api): Promise<BaseItemDto[]> {
    return new Promise(async (resolve, reject) => {
        console.debug("Fetching music libraries from Jellyfin");
        
        let libraries = await getItemsApi(api).getItems({ includeItemTypes: ['CollectionFolder'] });

        if (_.isUndefined(libraries.data.Items)) {
            console.warn("No libraries found on Jellyfin");
            return reject("No libraries found on Jellyfin");
        }

        console.debug(`Found Jellyfin libraries`, libraries)

        let musicLibraries = libraries.data.Items!.filter(library => library.CollectionType == 'music');

        console.debug(`Returning ${musicLibraries.length} music libraries`);
        
        return resolve(musicLibraries);
    });
}

export function fetchPlaylistLibrary(api: Api): Promise<BaseItemDto> {
    return new Promise(async (resolve, reject) => {
        console.debug("Fetching music libraries from Jellyfin");
        
        let libraries = await getItemsApi(api).getItems({ includeItemTypes: ['CollectionFolder'], nameStartsWith: "Playlists" });

        if (_.isUndefined(libraries.data.Items)) {
            console.warn("No playlist libraries found on Jellyfin");
            return reject("No playlist libraries found on Jellyfin");
        }

        console.debug(`Found Jellyfin playlist libraries`, libraries)
        
        return resolve(libraries.data.Items![0]);
    })
}