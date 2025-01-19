import _ from "lodash";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import Login from "./Login/component";
import { JellyfinAuthenticationProvider } from "./Login/provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JellifyDarkTheme, JellifyLightTheme } from "./theme";
import { PlayerProvider } from "../player/provider";
import { useColorScheme } from "react-native";
import { PortalProvider } from "tamagui";
import Client from "@/api/client";

export default function Jellify(): React.JSX.Element {

  return (
    <PortalProvider shouldAddRootHost>
      <App />
    </PortalProvider>
  );
}

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === "dark";
  
  useEffect(() => {
    console.debug("Client instance changed")
  }, [
    Client.instance
  ])

  return (
    <NavigationContainer theme={isDarkMode ? JellifyDarkTheme : JellifyLightTheme}>
      <SafeAreaProvider>
        { Client.user && Client.user ? (
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