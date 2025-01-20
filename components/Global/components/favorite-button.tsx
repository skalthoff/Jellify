import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import React, { useEffect, useState } from "react";
import Icon from "../helpers/icon";
import { Colors } from "../../../enums/colors";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import { useMutation } from "@tanstack/react-query";
import { isUndefined } from "lodash";
import { useUserData } from "../../../api/queries/favorites";
import { Spinner } from "tamagui";
import Client from "../../../api/client";
import { usePlayerContext } from "../../..//player/provider";

interface SetFavoriteMutation {
    item: BaseItemDto,
}

export default function FavoriteHeaderButton({ 
    item,
    onToggle
}: {
    item: BaseItemDto;
    onToggle?: () => void
}) : React.JSX.Element {

    const { nowPlaying, nowPlayingIsFavorite } = usePlayerContext();

    const [isFavorite, setIsFavorite] = useState<boolean>(isFavoriteItem(item));

    const { data, isFetching, isFetched, refetch } = useUserData(item.Id!);

    const useSetFavorite = useMutation({
        mutationFn: async (mutation: SetFavoriteMutation) => {
            return getUserLibraryApi(Client.api!)
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
            return getUserLibraryApi(Client.api!)
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
            useRemoveFavorite.mutate({ item })
        else
            useSetFavorite.mutate({ item })
    }

    useEffect(() => {
        if (isFetched && data && data.IsFavorite)
            setIsFavorite(data.IsFavorite)
    })

    useEffect(() => {
        refetch();
        setIsFavorite(
            isUndefined(item.UserData) ? false 
            : item.UserData.IsFavorite ?? false
        );
    }, [
        item
    ]);

    useEffect(() => {
        if (nowPlayingIsFavorite !== isFavorite && nowPlaying?.item.Id === item.Id) {
            setIsFavorite(nowPlayingIsFavorite);
        }
    }, [
        nowPlayingIsFavorite
    ])

    return (
        isFetching && isUndefined(item.UserData) ? (
            <Spinner />
        ) : (
            <Icon
                name={isFavorite ? "heart" : "heart-outline"}
                color={Colors.Primary}
                onPress={toggleFavorite}
            /> 

        )
    )
}

export function isFavoriteItem(item: BaseItemDto) : boolean {
    return isUndefined(item.UserData) ? false 
        : isUndefined(item.UserData.IsFavorite) ? false
        : item.UserData.IsFavorite
}