import Artist from "../../Artist/component";
import { ProvidedHomeProps } from "../types";

export function HomeArtistScreen({route, navigation}: ProvidedHomeProps): React.JSX.Element {
    return (
        // @ts-ignore
        <Artist artistId={route.params!.artistId} />
    );
}