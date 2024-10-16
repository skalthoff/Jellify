import { ActivityIndicator, SafeAreaView, Text, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import { useCredentials } from "../api/queries/keychain";
import _ from "lodash";
import { jellifyStyles } from "./styles";
import { createContext, useContext, useState } from "react";
import { SharedWebCredentials } from "react-native-keychain";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let { data, isError, isSuccess, isPending } = useCredentials;

  const [credentials, setCredentials] = useState(data);

  const LoginContext = createContext<[SharedWebCredentials | undefined, React.Dispatch<React.SetStateAction<SharedWebCredentials | undefined>>]>([data, setCredentials]);

  return (
    (isPending) ? (
      <SafeAreaView style={jellifyStyles.container}>
        <Text>Logging in</Text>
        <ActivityIndicator />
      </SafeAreaView>
    ) : (
      <LoginContext.Provider value={[credentials, setCredentials]}>
        <NavigationContainer>
          <SafeAreaView style={jellifyStyles.container}>
          { (!isError && !_.isUndefined(data)) ? <Navigation /> : <Login /> }
          </SafeAreaView>
        </NavigationContainer>
      </LoginContext.Provider>
    )
  );
}