import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackParamList } from "../types";
import TrackOptions from "./helpers/TrackOptions";
import { View } from "tamagui";

export default function ItemDetail({ 
    item, 
    navigation 
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList> 
}) : React.JSX.Element {

    let options: React.JSX.Element | undefined = undefined;

    switch (item.Type) {
        case "Audio": {
            options = TrackOptions({ item, navigation });
            break;
        }

        case "MusicAlbum" : {

            break;
        }

        case "MusicArtist" : {

            break;
        }

        case "Playlist" : {

            break;
        }

        default : {
            break;
        }
    }

    return (
        <SafeAreaView edges={["right", "left"]}>
            
            { options ?? <View /> }
        </SafeAreaView>
    )
}