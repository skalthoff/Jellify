import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React, {  } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "./navigation";
import { jellifyStyles } from "./styles";
import { View } from "react-native-ui-lib";
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

  const { libraryId } = useApiClientContext();

  const Stack = createNativeStackNavigator()
  
  const Tab = createBottomTabNavigator();
  
  return (
    <View style={jellifyStyles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            { !_.isUndefined(libraryId) ? (
              <Tab.Screen name="Navigation" component={Navigation} />
            ) : (
              <Stack.Screen name="Login" component={Login} /> 
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}