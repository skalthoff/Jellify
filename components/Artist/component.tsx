import { ScrollView } from "tamagui";
import Avatar from "../helpers/avatar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Artist({ artistId, artistName }: { artistId: string, artistName: string  }): React.JSX.Element {
    return (
        <SafeAreaView>
            <ScrollView>
                <Avatar itemId={artistId} />
            </ScrollView>
        </SafeAreaView>
    )
}