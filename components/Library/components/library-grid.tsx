import React from "react";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { FlatList, RefreshControl, useWindowDimensions } from "react-native";
import { Spinner, YStack } from "tamagui";
import { ItemCard } from "../../Global/components/item-card";
import { useHeaderHeight } from '@react-navigation/elements';

interface LibraryGridProps {
    items: BaseItemDto[];
    onItemPress: (item: BaseItemDto) => void;
    numColumns: number;
    squared: boolean;
    headerHeight: number;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isPending: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
}

export function LibraryGrid({ 
    items, 
    onItemPress, 
    numColumns, 
    squared,
    headerHeight,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    onEndReached,
    onRefresh
}: LibraryGridProps) {
    const { width } = useWindowDimensions();
    const itemGap = 6; // Gap between items
    const containerPadding = 16; // Padding on both sides
    const itemWidth = (width - (containerPadding * 2) - ((numColumns - 1) * itemGap)) / numColumns;

    return (
        <FlatList
            style={{ 
                flex: 1,
                paddingTop: headerHeight + 60
            }}
            contentContainerStyle={{
                paddingHorizontal: containerPadding
            }}
            contentInsetAdjustmentBehavior="automatic"
            numColumns={numColumns}
            data={items}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    onEndReached();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => 
                isFetchingNextPage ? (
                    <YStack padding="$4" alignItems="center">
                        <Spinner size="large" />
                    </YStack>
                ) : null
            }
            refreshControl={
                <RefreshControl
                    refreshing={isPending}
                    onRefresh={onRefresh}
                    progressViewOffset={headerHeight}
                />
            }
            columnWrapperStyle={{
                gap: itemGap,
                marginBottom: itemGap
            }}
            renderItem={({ item }) => (
                <ItemCard
                    item={item}
                    caption={item.Name ?? "Untitled"}
                    subCaption={item.ProductionYear?.toString()}
                    width={itemWidth}
                    squared={squared}
                    onPress={() => onItemPress(item)}
                />
            )}
        />
    );
} 