import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { Api } from "@jellyfin/sdk";
import { getItemsApi } from "@jellyfin/sdk/lib/utils/api/items-api"
import { useApi } from "../queries";


export const useImageByItemId = (artistId: string) => useQuery({
    queryKey: [QueryKeys.ArtistById, artistId],
    queryFn: (({ queryKey }) => {

        return getItemsApi(useApi.data!).getItems({ ids: [queryKey[1]]});
    })
})