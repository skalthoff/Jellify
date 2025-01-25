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
import JellifyCarplay from "./carplay";

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

  const [carPlayConnected, setCarPlayConnected] = useState(CarPlay.connected);
  
  useEffect(() => {
    console.debug("Client instance changed")
  }, [
    Client.instance
  ])

  useEffect(() => {

    function onConnect() {
      setCarPlayConnected(true)
    }

    function onDisconnect() {
      setCarPlayConnected(false)
    }

    CarPlay.registerOnConnect(onConnect);
    CarPlay.registerOnDisconnect(onDisconnect);
    return () => {
      CarPlay.unregisterOnConnect(onConnect)
      CarPlay.unregisterOnDisconnect(onDisconnect)
    };
  });

  return carPlayConnected ? (
    <NavigationContainer>
        { loggedIn ? (
              <></>
            ) : (
            <View>
              <Text>Please login in the app before using CarPlay</Text>
            </View>
          )}
      </NavigationContainer>
  ) : (
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