import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { useApi } from "../api/queries";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login/component";
import Navigation from "./navigation";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Jellify(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';

    // Attempt to create API instance, if it fails we aren't authenticated yet
    let { error, isLoading, isSuccess } = useApi;
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
          isSuccess ? <Navigation /> : <Login />
        </SafeAreaView>
      </NavigationContainer>

    );
}