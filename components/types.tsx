import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type StackParamList = {
    Home: undefined;
    Artist: { 
        artistId: string,
        artistName: string
    };
    Album: {
        albumId: string,
        albumName: string,
    };
}

export type ProvidedHomeProps = NativeStackScreenProps<StackParamList, 'Home'>;

export type HomeArtistProps = NativeStackScreenProps<StackParamList, 'Artist'>;

export type HomeAlbumProps = NativeStackScreenProps<StackParamList, 'Album'>;