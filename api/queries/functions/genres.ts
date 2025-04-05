import { BaseItemDto, BaseItemKind, ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api";
import { QueryConfig } from "../query.config";
import Client from "../../client";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";

// copied from recents
// needs to be implemented for genres

export function fetchGenres(limit: number = QueryConfig.limits.recents, offset?: number | undefined) : Promise<BaseItemDto[]> {
    return new Promise(async (resolve, reject) => {

        if (!!!Client.api)
            return reject("Client not set")

        if (!!!Client.library)
            return reject("Library not set")
        else
            getUserLibraryApi(Client.api)
                .getLatestMedia({
                    parentId: Client.library.musicLibraryId,
                    limit,
                    
                })
                .then(({ data }) => {
                    resolve(offset ? data.slice(offset, data.length - 1) : data);
                });
    })
}