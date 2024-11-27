import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type HomeStackParamList = {
    Home: undefined;
    Artist: { 
        artistId: string,
        artistName: string
    };
}

export type ProvidedHomeProps = NativeStackScreenProps<HomeStackParamList>;
