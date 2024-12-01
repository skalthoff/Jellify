import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "./Player/component";
import { Tabs } from "./tabs";

export default function Navigation(): React.JSX.Element {

  const RootStack = createNativeStackNavigator()
  
    return (
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen 
            name="Tabs" 
            component={Tabs}
            options={{
              headerShown: false
            }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen name="Player" component={Player} />
        </RootStack.Group>
    </RootStack.Navigator>
    )
}