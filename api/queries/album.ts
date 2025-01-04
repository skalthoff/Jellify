import { Api } from "@jellyfin/sdk";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api";
import { ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models";

export const useAlbumTracks = (albumId: string, api: Api) => useQuery({
    queryKey: [QueryKeys.AlbumTracks, albumId, api],
    queryFn: ({ queryKey }) => {
        return getItemsApi(queryKey[2] as Api).getItems({
            parentId: albumId,
            sortBy: [
                ItemSortBy.ParentIndexNumber,
                ItemSortBy.IndexNumber,
                ItemSortBy.SortName
            ]
        })
        .then((response) => {
            return response.data.Items ? response.data.Items! : [];
        })
    }
})