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
import { JellifyProvider, useJellifyContext } from "./provider";

export default function Jellify(): React.JSX.Element {

  return (
    <PortalProvider shouldAddRootHost>
      <JellifyProvider>
        <App />
      </JellifyProvider>
    </PortalProvider>
  );
}

function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === "dark";

  const { loggedIn } = useJellifyContext();
  
  useEffect(() => {
    console.debug("Client instance changed")
  }, [
    Client.instance
  ])

  return (
    <NavigationContainer theme={isDarkMode ? JellifyDarkTheme : JellifyLightTheme}>
      <SafeAreaProvider>
        { loggedIn ? (
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