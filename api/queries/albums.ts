import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { useApi } from "../queries";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { useChildrenFromParent } from "./items";
import { fetchServerUrl } from "./functions/storage";
import { createApi } from "./functions/api";

export const useArtistAlbums : (artistId: string) => UseQueryResult<BaseItemDto[], Error> = (artistId: string) => useQuery({
    queryKey: [QueryKeys.ArtistAlbums, artistId],
    queryFn: async ({ queryKey }) => {
        return getItemsApi(await createApi(await fetchServerUrl()))
            .getItems({ albumArtistIds: [queryKey[1]] })
            .then((result) => {
                return result.data.Items
            });
    }
});

export const useAlbumSongs : (albumId: string) => UseQueryResult<BaseItemDto[], Error> = (albumId: string) => useChildrenFromParent(QueryKeys.AlbumTracks, albumId);