import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type StackParamList = {
    Home: undefined;
    Artist: { 
        artistId: string,
        artistName: string
    };
    Album: {
        album: BaseItemDto
    };
}

export type ProvidedHomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

export type HomeArtistProps = NativeStackScreenProps<StackParamList, 'Artist'>;

export type HomeAlbumProps = NativeStackScreenProps<StackParamList, 'Album'>;