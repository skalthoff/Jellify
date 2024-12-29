import { SafeAreaView } from "react-native-safe-area-context";
import { StackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface AlbumProps {
    albumId: string,
    albumName?: string | null | undefined;
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Album(props: AlbumProps): React.JSX.Element {
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}