import { ActivityIndicator, SafeAreaView, Text, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import { useCredentials, useServer } from "../api/queries/keychain";
import _ from "lodash";
import { jellifyStyles } from "./styles";
import { useState } from "react";
import { LoginContext } from "./contexts";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../types/JellifyServer";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let credentials = useCredentials;

  const [keychain, setKeychain] : [SharedWebCredentials | undefined, React.Dispatch<React.SetStateAction<SharedWebCredentials | undefined>> ]= useState();

  const loginContextFns = {
    setKeychainFn: (state: SharedWebCredentials | undefined) => {
      setKeychain(state);
    }
  }

  return (
    (
      <LoginContext.Provider value={{keychain, loginContextFns}}>
        <NavigationContainer>
          <SafeAreaView style={jellifyStyles.container}>
          { (credentials.isSuccess && !_.isUndefined(credentials.data)) ? <Navigation /> : <Login /> }
          </SafeAreaView>
        </NavigationContainer>
      </LoginContext.Provider>
    )
  );
}