import React, { createContext, ReactNode, useContext, useState } from "react";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchGenres } from "../../api/queries/functions/genres";
import { queryClient } from "../../constants/query-client";
import { QueryConfig } from "../../api/queries/query.config";

// to implement
// needs to map through genres and grab 10 items from each
// copied from home provider - had carosel..

interface GenresContext {
    refreshing: boolean;
    onRefresh: () => void;
    genres: BaseItemDto[] | undefined;
}

const GenresContextInitializer = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { data : genres, refetch : refetchGenres } = useQuery({
        queryKey: [QueryKeys.Genres],
        queryFn: () => fetchGenres()
    });

    const onRefresh = async () => {
        setRefreshing(true);

        queryClient.invalidateQueries({
            queryKey: [QueryKeys.Genres, QueryConfig.limits.recents * 4, QueryConfig.limits.recents]
        });
        
        await Promise.all([
            refetchGenres(),
        ])

        setRefreshing(false);
    }

    return {
        refreshing,
        onRefresh,
        genres,

    };
}

const GenresContext = createContext<GenresContext>({
    refreshing: false,
    onRefresh: () => {},
    genres: undefined,
});

export const GenresProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element = ({ 
    children 
} : { 
    children: ReactNode
}) => {

    const {
        refreshing,
        onRefresh,
        genres,
    } = GenresContextInitializer();

    return (
        <GenresContext.Provider value={{
            refreshing,
            onRefresh,
            genres,
        }}>
            { children }
        </GenresContext.Provider>
    )
}

export const useGenresContext = () => useContext(GenresContext);