import React from "react";
import { XStack, Button, Sheet, YStack, Text } from "tamagui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ItemSortBy, SortOrder } from "@jellyfin/sdk/lib/generated-client/models";
import { TouchableOpacity } from "react-native";
import { LibrarySortBy, LibrarySortOrder } from "../../../api/queries/functions/items";

export const sortOptions: {
    label: string;
    value: LibrarySortBy;
    }[] = [
        { label: "Name", value: ItemSortBy.SortName },
        { label: "Recently Added", value: ItemSortBy.DateCreated },
        { label: "Recently Played", value: ItemSortBy.DatePlayed },
        { label: "Play Count", value: ItemSortBy.PlayCount },
        { label: "Random", value: ItemSortBy.Random }
    ]

export const sortOrderOptions: {
    label: string;
    value: LibrarySortOrder;
    }[] = [
        { label: "Ascending", value: SortOrder.Ascending },
        { label: "Descending", value: SortOrder.Descending }
    ];

type LibraryFilterBarProps = {
    isFavorite: boolean;
    setIsFavorite: (value: boolean) => void;
    sortBy: LibrarySortBy;
    setSortBy: (value: LibrarySortBy) => void;
    sortOrder: LibrarySortOrder;
    setSortOrder: (value: LibrarySortOrder) => void;
    onRefetch: () => void;
    headerHeight: number;
};

export function LibraryFilterBar({
    isFavorite,
    setIsFavorite,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    onRefetch,
    headerHeight
}: LibraryFilterBarProps): React.JSX.Element {
    const [open, setOpen] = React.useState(false);

    return (   
        <>
            <XStack 
                position="absolute" 
                top={headerHeight + 8} 
                right={24}
                zIndex={9999}
                gap="$2"
            >
                <Button
                    circular
                    size="$4"
                    icon={<MaterialCommunityIcons 
                        name={isFavorite ? "heart" : "heart-outline"} 
                        size={24} 
                        color={isFavorite ? "$red10" : undefined}
                    />}
                    backgroundColor={isFavorite ? "$backgroundFocus" : "$background"}
                    elevation={4}
                    onPress={() => {
                        setIsFavorite(!isFavorite);
                        onRefetch();
                    }}
                />
                <Sheet
                    modal
                    open={open}
                    onOpenChange={setOpen}
                    snapPoints={[100]}
                    dismissOnSnapToBottom
                >
                    <Sheet.Overlay 
                        backgroundColor="rgba(0,0,0,0.5)"
                        onPress={() => setOpen(false)}
                    />
                    <Sheet.Frame
                        padding="$4"
                        backgroundColor="transparent"
                    >
                        <TouchableOpacity 
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0)',
                            }}
                            activeOpacity={1}
                            onPress={() => setOpen(false)}
                        />
                        <YStack 
                            gap="$2"
                            backgroundColor="$background"
                            padding="$4"
                            borderRadius="$4"
                            width="90%"
                            maxWidth={400}
                            alignSelf="center"
                            marginTop="auto"
                            marginBottom="auto"
                            elevation={4}
                        >
                            <Text fontWeight="bold" marginBottom="$2">Sort By</Text>
                            {sortOptions.map((option) => (
                                <Button
                                    key={String(option.value)}
                                    onPress={() => {
                                        setSortBy(option.value);
                                        setOpen(false);
                                    }}
                                    backgroundColor={sortBy === option.value ? "$backgroundHover" : undefined}
                                    padding="$3"
                                >
                                    <XStack gap="$2" alignItems="center" justifyContent="space-between" width="100%">
                                        <Text>{option.label}</Text>
                                        {sortBy === option.value && (
                                            <MaterialCommunityIcons name="check" size={20} />
                                        )}
                                    </XStack>
                                </Button>
                            ))}
                            
                            <YStack height={1} backgroundColor="$borderColor" marginVertical="$2" />
                            
                            <Text fontWeight="bold" marginBottom="$2">Order</Text>
                            {sortOrderOptions.map((option) => (
                                <Button
                                    key={option.value}
                                    onPress={() => {
                                        setSortOrder(option.value);
                                        setOpen(false);
                                    }}
                                    backgroundColor={sortOrder === option.value ? "$backgroundHover" : undefined}
                                    padding="$3"
                                >
                                    <XStack gap="$2" alignItems="center" justifyContent="space-between" width="100%">
                                        <Text>{option.label}</Text>
                                        {sortOrder === option.value && (
                                            <MaterialCommunityIcons name="check" size={20} />
                                        )}
                                    </XStack>
                                </Button>
                            ))}
                        </YStack>
                    </Sheet.Frame>
                </Sheet>

                <Button
                    circular
                    size="$4"
                    icon={<MaterialCommunityIcons name="sort" size={24} />}
                    backgroundColor="$background"
                    elevation={4}
                    onPress={() => setOpen(true)}
                />
            </XStack>
        </>
    );
} 