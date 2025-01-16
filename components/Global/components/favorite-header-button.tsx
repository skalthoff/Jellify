import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import React, { useState } from "react";
import Icon from "../helpers/icon";
import { Colors } from "@/enums/colors";
import { useApiClientContext } from "@/components/jellyfin-api-provider";
import { Api } from "@jellyfin/sdk";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import { useMutation } from "@tanstack/react-query";
import { isUndefined } from "lodash";

interface SetFavoriteMutation {
    item: BaseItemDto,
    api: Api
}

export default function FavoriteHeaderButton({ 
    item,
    isFavoriteItem,
    onToggle
}: {
    item: BaseItemDto;
    isFavoriteItem?: boolean | undefined;
    onToggle?: () => void
}) : React.JSX.Element {

    const [
        isFavorite, 
        setIsFavorite
    ] = useState<boolean>(
        !isUndefined(isFavoriteItem) ? 
        isFavoriteItem : 
        !isUndefined(item.UserData) ?
        item.UserData.IsFavorite ?? false : 
        false
    );

    const { apiClient } = useApiClientContext()

    
    const useSetFavorite = useMutation({
        mutationFn: async (mutation: SetFavoriteMutation) => {
            return getUserLibraryApi(mutation.api)
                .markFavoriteItem({
                    itemId: mutation.item.Id!
                })
        },
        onSuccess: () => {
            setIsFavorite(true);
            if (onToggle)
                onToggle();
        }
    })
    
    const useRemoveFavorite = useMutation({
        mutationFn: async (mutation: SetFavoriteMutation) => {
            return getUserLibraryApi(mutation.api)
                .unmarkFavoriteItem({
                    itemId: mutation.item.Id!
                })
        },
        onSuccess: () => {
            setIsFavorite(false);
        }
    })

    const toggleFavorite = () => {
        if (isFavorite)
            useRemoveFavorite.mutate({ item, api: apiClient!})
        else
            useSetFavorite.mutate({ item, api: apiClient! })
    }

    return (
        <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            color={Colors.Primary}
            onPress={toggleFavorite}
        /> 
    )
}