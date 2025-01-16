import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import React, { useEffect, useState } from "react";
import Icon from "../helpers/icon";
import { Colors } from "@/enums/colors";
import { useApiClientContext } from "@/components/jellyfin-api-provider";
import { Api } from "@jellyfin/sdk";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { useUserData } from "@/api/queries/favorites";

interface SetFavoriteMutation {
    item: BaseItemDto,
    api: Api
}

export default function FavoriteHeaderButton({ 
    item,
    onToggle
}: {
    item: BaseItemDto;
    onToggle?: () => void
}) : React.JSX.Element {

    
    const { apiClient } = useApiClientContext();

    const [isFavorite, setIsFavorite] = useState<boolean>(item.UserData!.IsFavorite!)

    const { data, isFetching, isFetched, refetch } = useUserData(apiClient!, item.Id!);

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

    useEffect(() => {
        if (isFetched && data && data.IsFavorite)
            setIsFavorite(data.IsFavorite)
    })

    useEffect(() => {
        refetch()
        setIsFavorite(item.UserData!.IsFavorite!)
    }, [
        item
    ])

    return (
        <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            color={Colors.Primary}
            onPress={toggleFavorite}
        /> 
    )
}