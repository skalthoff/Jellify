import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation";
import Login from "./Login/component";
import { JellyfinAuthenticationProvider } from "./Login/provider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { JellifyDarkTheme, JellifyLightTheme } from "./theme";
import { PlayerProvider } from "../player/provider";
import { Text, useColorScheme, View } from "react-native";
import { PortalProvider } from "tamagui";
import Client from "../api/client";
import { JellifyProvider, useJellifyContext } from "./provider";
import { CarPlay } from "react-native-carplay"
import { createStackNavigator } from "@react-navigation/stack";
import CarPlayHome from "./CarPlay/Home";

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
  )
}