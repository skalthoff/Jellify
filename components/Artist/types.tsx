import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ArtistParamList = {
    Artist: { artistId: string };
}

export type ArtistProps = NativeStackScreenProps<ArtistParamList, 'Artist'>