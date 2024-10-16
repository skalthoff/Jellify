import { ActivityIndicator, SafeAreaView, Text, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import { useCredentials, useServer } from "../api/queries/keychain";
import _ from "lodash";
import { jellifyStyles } from "./styles";
import { useMemo, useState } from "react";
import { LoginContext } from "./contexts";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../types/JellifyServer";
import LoginProvider from "./providers";
import { mutateServerCredentials } from "../api/mutators/functions/storage";
import { credentials } from "../api/mutators/storage";
import { useApi } from "../api/queries";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [keychainState, setKeychain] : [SharedWebCredentials | undefined, React.Dispatch<React.SetStateAction<SharedWebCredentials | undefined>> ]= useState();

  const loginContextFns = {
    setKeychainFn: (state: SharedWebCredentials | undefined) => {
      setKeychain(state);
    }
  }

  const { data: api, isPending, isError, refetch } = useApi();

  const apiContext = useMemo(() => ({api, isPending, isError, refetch}),
  [api, isPending, isError, refetch] 
);

  return (
    (isPending) ? (
      <SafeAreaView style={jellifyStyles.container}>
        <Text>Logging in</Text>
        <ActivityIndicator />
      </SafeAreaView>
    ) : (
      <LoginProvider loginContextFns={loginContextFns}>
        <NavigationContainer>
          <SafeAreaView style={jellifyStyles.container}>
          { (!_.isUndefined(api) && !isError) ? <Navigation /> : <Login /> }
          </SafeAreaView>
        </NavigationContainer>
      </LoginProvider>
    )
  );
}