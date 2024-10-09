import { Text, View } from "react-native";
import { useActiveTrack } from "react-native-track-player";

export default function Player(): React.JSX.Element {

    let activeTrack = useActiveTrack()!;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>{activeTrack.title ?? "Nothing playing"}</Text>
        </View>
    );
}