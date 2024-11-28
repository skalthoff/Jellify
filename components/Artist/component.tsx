import { ScrollView } from "tamagui";
import Avatar from "../Global/avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArtistAlbums } from "../../api/queries/artist";
import { useApiClientContext } from "../jellyfin-api-provider";

export default function Artist({ artistId, artistName }: { artistId: string, artistName: string  }): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    const { data: albums } = useArtistAlbums(artistId, apiClient!);

    return (
        <SafeAreaView>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <Avatar itemId={artistId} />

                { albums && albums.map((album) => {
                    return (
                        <Avatar itemId={album.Id!}>
                            { album.Name ?? "Untitled Album" }
                        </Avatar>
                    )
                }) }
            </ScrollView>
        </SafeAreaView>
    )
}