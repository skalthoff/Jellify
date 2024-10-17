import { ActivityIndicator, SafeAreaView, Text, useColorScheme } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import _ from "lodash";
import { JellyfinApiClientContext, JellyfinApiClientProvider, useApiClientContext } from "./jellyfin-api-provider";
import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { jellifyStyles } from "./styles";

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

  const apiClientContext = useApiClientContext();
  
  return (
    <SafeAreaView style={jellifyStyles.container}>
      { !_.isUndefined(apiClientContext.apiClient) ? (
        <Navigation />
      ) : (
        <NavigationContainer>
          <Login /> 
        </NavigationContainer>
      )}
      </SafeAreaView>
  );
}