import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Player from "./Player/stack";
import { Tabs } from "./tabs";
import { StackParamList } from "./types";

export default function Navigation(): React.JSX.Element {

  const RootStack = createNativeStackNavigator<StackParamList>()
  
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
    </RootStack.Navigator>
    )
}