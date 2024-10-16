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

  let jellifyServer = useServer;
  let { data, isError, isSuccess, isPending } = useCredentials;

  const [keychain, setKeychain] = useState(data);
  const [server, setServer] = useState(jellifyServer.data)

  const loginContextFns = {
    setKeychainFn: (state: SharedWebCredentials | undefined) => {
      setKeychain(state);
    },
    setServerFn: (state: JellifyServer | undefined) => {
      setServer(state);
    }
  }


  return (
    (isPending) ? (
      <SafeAreaView style={jellifyStyles.container}>
        <Text>Logging in</Text>
        <ActivityIndicator />
      </SafeAreaView>
    ) : (
      <LoginContext.Provider value={{keychain, server, loginContextFns}}>
        <NavigationContainer>
          <SafeAreaView style={jellifyStyles.container}>
          { (isSuccess && !_.isUndefined(data)) ? <Navigation /> : <Login /> }
          </SafeAreaView>
        </NavigationContainer>
      </LoginContext.Provider>
    )
  );
}