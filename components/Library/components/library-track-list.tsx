import React, { useState } from "react";
import { BaseItemDto, BaseItemKind } from "@jellyfin/sdk/lib/generated-client/models";
import { FlatList, RefreshControl, View } from "react-native";
import { Spinner, YStack } from "tamagui";
import { LibraryItemKind } from "../../../api/queries/functions/items";
import Track from "../../Global/components/track";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types";
import { Queue } from "../../../player/types/queue-item";

interface LibraryListProps {
    items: BaseItemDto[];
    onItemPress: (item: BaseItemDto) => void;
    itemType: LibraryItemKind;
    headerHeight: number;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isPending: boolean;
    onEndReached: () => void;
    onRefresh: () => void;
}

export default function LibraryTrackList({
    items,
    onItemPress,
    itemType,
    headerHeight,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    onEndReached,
    onRefresh
}: LibraryListProps): React.JSX.Element {
    const [containerWidth, setContainerWidth] = useState(0);
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
    const queue: Queue = "Search";

    if (isPending) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center">
                <Spinner size="large" />
            </YStack>
        );
    }

    return (
        <View 
            style={{ flex: 1 }}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <Track
                        track={item}
                        navigation={navigation}
                        queue={queue}
                        showArtwork={true}
                        onPress={() => onItemPress(item)}
                    />
                )}
                keyExtractor={(item, index) => item.Id || `item-${index}`}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <YStack padding="$4" alignItems="center">
                            <Spinner size="small" />
                        </YStack>
                    ) : null
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isPending}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={{
                    paddingTop: headerHeight + 60,
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            />
        </View>
    );
} 