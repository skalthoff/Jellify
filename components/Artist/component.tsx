import { ScrollView } from "tamagui";
import Avatar from "../Global/avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArtistAlbums } from "../../api/queries/artist";
import { useApiClientContext } from "../jellyfin-api-provider";
import { FlatList } from "react-native";
import { Card } from "../Global/card";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { H5 } from "../Global/text";

interface ArtistProps {
    artistId: string,
    artistName: string,
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Artist(props: ArtistProps): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    const { data: albums } = useArtistAlbums(props.artistId, apiClient!);

    return (
        <SafeAreaView>
            <ScrollView 
                alignContent="center" 
                contentInsetAdjustmentBehavior="automatic"
            >
                <Avatar itemId={props.artistId} />

                <H5>Albums</H5>
                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: "flex-start"
                    }}
                    data={albums}
                    numColumns={2} // TODO: Make this adjustable
                    renderItem={({ item: album }) => {
                        return (
                            <Card
                                caption={album.Name}
                                subCaption={album.ProductionYear?.toString()}
                                marginHorizontal={10}
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
        </SafeAreaView>
    )
}