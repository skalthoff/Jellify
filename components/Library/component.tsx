import React from "react";
import { QueryKeys } from "../../enums/query-keys";
import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { fetchItems, FetchItemsResponse, FetchItemsParams, LibrarySortBy, LibrarySortOrder, LibraryItemKind } from "../../api/queries/functions/items";
import { QueryConfig } from "../../api/queries/query.config";
import { useHeaderHeight } from '@react-navigation/elements';
import { Spinner, YStack } from "tamagui";
import { BaseItemDto, SortOrder, ItemSortBy } from "@jellyfin/sdk/lib/generated-client/models";
import { LibraryFilterBar } from "./components/library-filter-bar";
import { LibraryGrid } from "./components/library-grid";
import LibraryTrackList from "./components/library-track-list";

type QueryFnType = (pageParam: number) => Promise<FetchItemsResponse>;

type ItemDisplayStyle = {
    numColumns: number;
    squared: boolean;
    layout: 'grid' | 'list';
};

interface LibraryProps {
    navigation: any;
    route: {
        params: {
            query: QueryKeys;
            itemType: LibraryItemKind;
            navigationParams: {
                screen: string;
                params: (item: BaseItemDto) => Record<string, any>;
            };
        }
    };
    displayStyle?: ItemDisplayStyle;
}

const createLibraryQuery = (
    query: QueryKeys,
    itemType: LibraryItemKind,
    sortBy: LibrarySortBy,
    sortOrder: LibrarySortOrder,
    isFavorite?: boolean
): { key: string[], fn: QueryFnType } => {
    const baseParams: FetchItemsParams = {
        itemType,
        sortBy: sortBy ? [sortBy] : undefined,
        sortOrder: sortOrder ? [sortOrder] : undefined,
        isFavorite: isFavorite
    };

    switch (query) {
        case QueryKeys.RecentlyPlayedArtists:
            return {
                key: [QueryKeys.RecentlyPlayedArtists, String(QueryConfig.limits.recents * 4), String(QueryConfig.limits.recents), itemType],
                fn: () => fetchItems({
                    ...baseParams,
                    limit: QueryConfig.limits.recents * 4
                })
            };
        case QueryKeys.FavoriteArtists:
            return {
                key: [QueryKeys.FavoriteArtists, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        case QueryKeys.AllArtists:
            return {
                key: [QueryKeys.AllArtists, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        case QueryKeys.FavoriteAlbums:
            return {
                key: [QueryKeys.FavoriteAlbums, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        case QueryKeys.RecentlyAdded:
            return {
                key: [QueryKeys.RecentlyAdded, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        case QueryKeys.FavoriteTracks:
            return {
                key: [QueryKeys.FavoriteTracks, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        case QueryKeys.RecentlyPlayed:
            return {
                key: [QueryKeys.RecentlyPlayed, sortBy, sortOrder, itemType],
                fn: (pageParam: number) => fetchItems({
                    ...baseParams,
                    page: pageParam
                })
            };
        default:
            return createLibraryQuery(QueryKeys.AllArtists, itemType, sortBy, sortOrder, isFavorite);
    }
};

export default function Library({ 
    navigation,
    route,
    displayStyle = {
        numColumns: 3,
        squared: true,
        layout: 'grid'
    }
}: LibraryProps): React.JSX.Element {
    const headerHeight = useHeaderHeight();
    const [isFavorite, setIsFavorite] = React.useState<boolean>(
        route.params.query === QueryKeys.FavoriteArtists ||
        route.params.query === QueryKeys.FavoriteAlbums ||
        route.params.query === QueryKeys.FavoriteTracks ||
        route.params.query === QueryKeys.Favorites
    );
    const [sortBy, setSortBy] = React.useState<LibrarySortBy>(ItemSortBy.SortName);
    const [sortOrder, setSortOrder] = React.useState<LibrarySortOrder>(SortOrder.Ascending);
    const [open, setOpen] = React.useState(false);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
        isPending
    } = useInfiniteQuery<FetchItemsResponse, Error, { pages: FetchItemsResponse[] }, string[], number>({
        queryKey: [
            route.params.query,
            route.params.itemType,
            sortBy,
            sortOrder,
            isFavorite ? 'favorites' : 'all'
        ],
        queryFn: ({ pageParam = 0 }: QueryFunctionContext<string[], number>) => {
            const { fn } = createLibraryQuery(
                route.params.query,
                route.params.itemType,
                sortBy,
                sortOrder,
                isFavorite
            );
            return fn(pageParam);
        },
        getNextPageParam: (lastPage: FetchItemsResponse | undefined): number | undefined => {
            if (!lastPage || !lastPage.hasMore) {
                return undefined;
            }
            return (data?.pages.length ?? 0) + 1;
        },
        initialPageParam: 0
    });

    const items = data?.pages.flatMap(page => page.items) ?? [];

    if (isPending) {
        return (
            <YStack 
                flex={1} 
                justifyContent="center" 
                alignItems="center"
                paddingTop={headerHeight}
            >
                <Spinner size="large" />
            </YStack>
        );
    }

    const handleItemPress = (item: BaseItemDto) => {
        navigation.navigate(
            route.params.navigationParams.screen,
            route.params.navigationParams.params(item)
        );
    };

    return (
        <YStack
            flex={1}
        >
            <LibraryFilterBar
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onRefetch={refetch}
                headerHeight={headerHeight}
            />
            {displayStyle.layout === 'grid' ? (
                <LibraryGrid
                    items={items}
                    onItemPress={handleItemPress}
                    numColumns={displayStyle.numColumns}
                    squared={displayStyle.squared}
                    headerHeight={headerHeight}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isPending={isPending}
                    onEndReached={fetchNextPage}
                    onRefresh={refetch}
                />
            ) : (
                <LibraryTrackList
                    items={items}
                    onItemPress={handleItemPress}
                    itemType={route.params.itemType}
                    headerHeight={headerHeight}
                    hasNextPage={hasNextPage}
                    isFetchingNextPage={isFetchingNextPage}
                    isPending={isPending}
                    onEndReached={fetchNextPage}
                    onRefresh={refetch}
                />
            )}
        </YStack>
    )
}
