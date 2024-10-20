import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React, {  } from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import Login from "./Login/component";

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
  
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        { !_.isUndefined(libraryId) ? (
          <Navigation />
        ) : (
          <Login /> 
        )}
    </NavigationContainer>
  );
}