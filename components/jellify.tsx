import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";
import { CurrentToast } from "./helpers/toast";
import { useCredentials } from "../api/queries/keychain";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let { data, isError, isSuccess } = useCredentials;


  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        { isError ? <Navigation /> : <Login /> }
        <CurrentToast />
      </SafeAreaView>
    </NavigationContainer>

  );
}