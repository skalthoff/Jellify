import { useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React, { useEffect } from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import Login from "./Login/component";
import { JellyfinAuthenticationProvider } from "./Login/provider";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  return (
    <JellyfinApiClientProvider>
      {conditionalHomeRender()}
    </JellyfinApiClientProvider>
  );
}

function conditionalHomeRender(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  // If library hasn't been set, we haven't completed the auth flow
  const { apiClient, library } = useApiClientContext();

  useEffect(() => {
    console.debug("Context changed, rerendering")
  }, [
    apiClient, 
    library
  ])
  
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        { apiClient && library ? <Navigation /> : (
          <JellyfinAuthenticationProvider>
            <Login /> 
          </JellyfinAuthenticationProvider>
        )}
    </NavigationContainer>
  );
}