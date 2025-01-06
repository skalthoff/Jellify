import { ScrollView } from "tamagui";
import Avatar from "../Global/avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArtistAlbums } from "../../api/queries/artist";
import { useApiClientContext } from "../jellyfin-api-provider";
import { FlatList } from "react-native";
import { Card } from "../Global/card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { H4, H5 } from "../Global/text";
import { useState } from "react";
import { CachedImage } from "@georstat/react-native-image-cache";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "@/api/queries/query.config";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";

interface ArtistProps {
    artistId: string,
    artistName: string,
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Artist(props: ArtistProps): React.JSX.Element {

    const [columns, setColumns] = useState<number>(2);

    const { apiClient } = useApiClientContext();

    const { data: albums } = useArtistAlbums(props.artistId, apiClient!);

    return (
        <ScrollView alignContent="center">
            <CachedImage
                source={getImageApi(apiClient!)
                    .getItemImageUrlById(
                        props.artistId,
                        ImageType.Primary,
                        { ...queryConfig.images})
                } 
                imageStyle={{
                    width: 1000,
                    height: 250,
                    resizeMode: "cover"
                }}
            />

            <H4>Albums</H4>
            <FlatList
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: "flex-start"
                }}
                data={albums}
                numColumns={columns} // TODO: Make this adjustable
                renderItem={({ item: album }) => {
                    return (
                        <Card
                            caption={album.Name}
                            subCaption={album.ProductionYear?.toString()}
                            marginHorizontal={10}
                            width={350 / columns}
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
        </ScrollView>
    )
}