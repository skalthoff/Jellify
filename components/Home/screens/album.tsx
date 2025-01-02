import { RouteProp } from "@react-navigation/native";
import Album from "../../Album/component";
import { StackParamList } from "../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export function HomeAlbumScreen({ route, navigation } : { route: RouteProp<StackParamList, "Album">, navigation: NativeStackNavigationProp<StackParamList> }): React.JSX.Element {
    return (
        <Album 
            album={route.params.album } 
            navigation={navigation}
        />
    )
}