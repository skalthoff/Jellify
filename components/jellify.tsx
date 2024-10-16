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
import { serverMutation } from "../api/mutators/functions/storage";
import { jellifyServerMutation } from "../api/mutators/storage";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let serverQuery = useServer;
  let credentials = useCredentials;

  const [server, setServer] : [JellifyServer | undefined, React.Dispatch<React.SetStateAction<JellifyServer | undefined>>] = useState();
  const [keychain, setKeychain] : [SharedWebCredentials | undefined, React.Dispatch<React.SetStateAction<SharedWebCredentials | undefined>> ] = useState();

  const loginContextFns = {
    setServerFn: (state: JellifyServer | undefined) => {
      jellifyServerMutation.mutate(state)
      setServer(state);
    },
    setKeychainFn: (state: SharedWebCredentials | undefined) => {
      setKeychain(state);
    }
  }

  return (
    (
      <LoginContext.Provider value={{keychain, server, loginContextFns}}>
        <NavigationContainer>
          <SafeAreaView style={jellifyStyles.container}>
          { (credentials.isSuccess && !_.isUndefined(credentials.data)) ? <Navigation /> : <Login /> }
          </SafeAreaView>
        </NavigationContainer>
      </LoginContext.Provider>
    )
  );
}