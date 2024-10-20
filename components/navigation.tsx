import createBottomTabNavigator from "@react-navigation/bottom-tabs/lib/typescript/src/navigators/createBottomTabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home/component";

export default function Navigation(): React.JSX.Element {

  const Stack = createNativeStackNavigator()
  
  const Tab = createBottomTabNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Home" options={{ headerShown: false }} component={Home} />
        </Stack.Navigator>
    )
}