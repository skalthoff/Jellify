import { createStackNavigator } from "@react-navigation/stack"
import { NowPlaying } from "./CarPlay/NowPlaying";

const Stack = createStackNavigator();

export default function JellifyCarplay(): React.JSX.Element {

    return (
        <Stack.Navigator>
            <Stack.Screen name="NowPlaying" component={NowPlaying} />
        </Stack.Navigator>
    )
}