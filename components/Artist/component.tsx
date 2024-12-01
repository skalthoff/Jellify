import { H5, ScrollView } from "tamagui";
import Avatar from "../Global/avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArtistAlbums } from "../../api/queries/artist";
import { useApiClientContext } from "../jellyfin-api-provider";
import { FlatList, Text } from "react-native";
import { Card } from "../Global/card";

export default function Artist({ artistId, artistName }: { artistId: string, artistName: string  }): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    const { data: albums } = useArtistAlbums(artistId, apiClient!);

    return (
        <SafeAreaView>
            <ScrollView 
                alignContent="center" 
                contentInsetAdjustmentBehavior="automatic"
            >
                <Avatar itemId={artistId} />

                <FlatList
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center'
                    }}
                    data={albums}
                    numColumns={2} // TODO: Make this adjustable
                    renderItem={({ item: album }) => {
                        return (
                            <Card
                                caption={
                                    <>
                                        <H5>{`${album.Name}`}</H5>
                                        <Text>{`${album.ProductionYear}`}</Text>
                                    </>
                                }
                                cornered 
                                itemId={album.Id!}
                            />
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}