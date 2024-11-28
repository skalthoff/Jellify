import { ScrollView } from "tamagui";
import Avatar from "../Global/avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArtistAlbums } from "../../api/queries/artist";
import { useApiClientContext } from "../jellyfin-api-provider";
import { FlatList } from "react-native";

export default function Artist({ artistId, artistName }: { artistId: string, artistName: string  }): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    const { data: albums } = useArtistAlbums(artistId, apiClient!);

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Avatar itemId={artistId} />

                <FlatList
                    data={albums}
                    numColumns={3} // TODO: Make this adjustable
                    renderItem={({ item: album }) => {
                        return (
                            <Avatar itemId={album.Id!} subheading={album.Name}>
                                { album.ProductionYear?.toLocaleString() ?? "" }
                            </Avatar>
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}