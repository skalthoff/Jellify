import { ScrollView } from "tamagui";
import Avatar from "../helpers/avatar";

export default function Artist({ artistId, artistName }: { artistId: string, artistName: string  }): React.JSX.Element {
    return (
        <ScrollView>
            <Avatar itemId={artistId}>
                {artistName}
            </Avatar>
        </ScrollView>
    )
}