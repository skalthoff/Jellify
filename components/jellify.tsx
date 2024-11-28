import { useColorScheme } from "react-native";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React from "react";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import Login from "./Login/component";
import { JellyfinAuthenticationProvider } from "./Login/provider";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Jellify(): React.JSX.Element {

  setupPlayer();

  return (
    <JellyfinApiClientProvider>
      <App />
    </JellyfinApiClientProvider>
  );
}

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  // If library hasn't been set, we haven't completed the auth flow
  const { library } = useApiClientContext();
  
  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        { library ? <Navigation /> : (
          <JellyfinAuthenticationProvider>
            <Login /> 
          </JellyfinAuthenticationProvider>
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}