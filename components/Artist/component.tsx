import { ScrollView, YStack } from "tamagui";
import { useArtistAlbums } from "../../api/queries/artist";
import { FlatList } from "react-native";
import { ItemCard } from "../Global/helpers/item-card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { H2 } from "../Global/helpers/text";
import { useState } from "react";
import { CachedImage } from "@georstat/react-native-image-cache";
import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import FavoriteHeaderButton from "../Global/components/favorite-button";
import Client from "../../api/client";

interface ArtistProps {
    artist: BaseItemDto
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Artist(props: ArtistProps): React.JSX.Element {

    props.navigation.setOptions({
        headerRight: () => { 
            return (
                <FavoriteHeaderButton item={props.artist} />
            )
        }
    });

    const [columns, setColumns] = useState<number>(2);

    const { height, width } = useSafeAreaFrame();

    const bannerHeight = height / 6;

    const { data: albums } = useArtistAlbums(props.artist.Id!);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["top", "right", "left"]}>
            <ScrollView 
                contentInsetAdjustmentBehavior="automatic"
                alignContent="center">
                <YStack alignContent="center" justifyContent="center" minHeight={bannerHeight}>
                    <CachedImage
                        source={getImageApi(Client.api!)
                            .getItemImageUrlById(
                                props.artist.Id!,
                                ImageType.Primary,
                                { ...queryConfig.banners})
                            } 
                        imageStyle={{
                            width: width,
                            height: bannerHeight,
                            alignSelf: "center",
                            resizeMode: "cover",
                            position: "relative"
                        }}
                    />
                </YStack>

                <H2>Albums</H2>
                    <YStack>
                        <FlatList
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center'
                            }}
                            data={albums}
                            numColumns={columns} // TODO: Make this adjustable
                            renderItem={({ item: album }) => {
                                return (
                                    <ItemCard
                                        caption={album.Name}
                                        subCaption={album.ProductionYear?.toString()}
                                        width={(width / 1.1) / columns}
                                        cornered 
                                        itemId={album.Id!}
                                        onPress={() => {
                                            props.navigation.navigate('Album', {
                                                album
                                            })
                                        }}
                                    />
                                )
                            }}
                        />
                    </YStack>
            </ScrollView>
        </SafeAreaView>
    )
}