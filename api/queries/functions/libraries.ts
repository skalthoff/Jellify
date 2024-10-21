import { Api } from "@jellyfin/sdk";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import _ from "lodash";


export const fetchMusicLibraries = async (api: Api) => {

    let libraries = await getItemsApi(api).getItems();

    if (_.isUndefined(libraries.data.Items))
        return Promise.reject("No libraries found on Jellyfin");

    let musicLibraries = libraries.data.Items!.filter(library => library.CollectionType == 'music');

    console.log(`Found ${musicLibraries.length} music libraries`);
    
    return musicLibraries;
}