import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import Player from "./Player/component";

export default function Jellify(): React.JSX.Element {
    
    const RootStack = createStackNavigator();

    return (
        <RootStack.Navigator>
          <RootStack.Group>
            <RootStack.Screen name="Jellify" component={Jellify} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="Player" component={Player} />
          </RootStack.Group>
        </RootStack.Navigator>
    );
}