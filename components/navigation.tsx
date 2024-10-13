import { createStackNavigator } from "@react-navigation/stack";
import Player from "./Player/component";
import Login from "./Login/component";


export default function Navigation(): React.JSX.Element {

    const RootStack = createStackNavigator();

    return (
        <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Jellify" component={Login} />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="Player" component={Player} />
        </RootStack.Group>
      </RootStack.Navigator>
    )
}