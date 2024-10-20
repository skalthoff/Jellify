import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/component";
import Player from "./Player/component";

export default function Navigation(): React.JSX.Element {

  const RootStack = createNativeStackNavigator()
  
    return (
      <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen name="Jellify" component={Home} />
      </RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="Player" component={Player} />
      </RootStack.Group>
    </RootStack.Navigator>
    )
}