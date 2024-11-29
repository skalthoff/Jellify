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
import { JellifyTheme } from "./theme";
import { PlayerProvider } from "../player/provider";

export default function Jellify(): React.JSX.Element {

  setupPlayer();

  return (
    <JellyfinApiClientProvider>
      <App />
    </JellyfinApiClientProvider>
  );
}

function App(): React.JSX.Element {

  // If library hasn't been set, we haven't completed the auth flow
  const { server, library } = useApiClientContext();
  
  return (
    <NavigationContainer theme={JellifyTheme}>
      <SafeAreaProvider>
        { server && library ? (
          <PlayerProvider>
            <Navigation />
          </PlayerProvider>
         ) : (
          <JellyfinAuthenticationProvider>
            <Login /> 
          </JellyfinAuthenticationProvider>
        )}
      </SafeAreaProvider>
    </NavigationContainer>
  );
}