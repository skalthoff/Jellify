import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

  setupPlayer();

  // Attempt to create API instance, if it fails we aren't authenticated yet
  let error, isLoading = true, isSuccess = false;
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <NavigationContainer>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        { isSuccess && <Navigation /> }
        { !isSuccess && <Login /> }
      </SafeAreaView>
    </NavigationContainer>

  );
}