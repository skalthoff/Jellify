import { RouteProp } from "@react-navigation/native";
import Artist from "../../Artist/component";
import { HomeStackParamList, ProvidedHomeProps } from "../types";

export function HomeArtistScreen({ route }: { route: RouteProp<HomeStackParamList> }): React.JSX.Element {
    return (
        <Artist 
            artistId={route.params!.artistId}
            artistName={route.params!.artistName}
        />
    );
}