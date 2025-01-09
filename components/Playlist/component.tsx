import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import { ScrollView } from "tamagui";

interface PlaylistProps { 
    playlist: BaseItemDto;
    navigation: NativeStackNavigationProp<StackParamList>
}

export default function Playlist(props: PlaylistProps): React.JSX.Element {
    return (
        <ScrollView>
            
        </ScrollView>
    )
}