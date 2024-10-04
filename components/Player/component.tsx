import { Text, View } from "react-native";

export default function Player(): React.JSX.Element {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>Player</Text>
        </View>
    );
}