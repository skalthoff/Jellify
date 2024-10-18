import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React, {  } from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./navigation";
import Login from "./Login/component";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <JellyfinApiClientProvider>
      {conditionalHomeRender()}
    </JellyfinApiClientProvider>
  );
}

function conditionalHomeRender(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  const { libraryId } = useApiClientContext();

  const Stack = createNativeStackNavigator()
  
  const Tab = createBottomTabNavigator();
  
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        { !_.isUndefined(libraryId) ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Navigation" options={{ headerShown: false }} component={Navigation} />
          </Stack.Navigator>
        ) : (
          <Login /> 
        )}
    </NavigationContainer>
  );
}