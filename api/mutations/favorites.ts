import { Api } from "@jellyfin/sdk";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import { useMutation } from "@tanstack/react-query";

interface SetFavoriteMutation {
    item: BaseItemDto,
    api: Api
}

export const useSetFavorite = () => useMutation({
    mutationFn: async (mutation: SetFavoriteMutation) => {
        return getUserLibraryApi(mutation.api)
            .markFavoriteItem({
                itemId: mutation.item.Id!
            })
    }
})

export const useRemoveFavorite = () => useMutation({
    mutationFn: async (mutation: SetFavoriteMutation) => {
        return getUserLibraryApi(mutation.api)
            .unmarkFavoriteItem({
                itemId: mutation.item.Id!
            })
    }
})