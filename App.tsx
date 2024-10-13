import './gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { usePlayer } from './player/queries';
import Login from './components/Login/component';
import Jellify from './components/Jellify/component';
import { useApi } from './api/queries';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = new QueryClient();

  usePlayer;

  // Attempt to create API instance, if it fails we aren't authenticated yet
  let { error, isLoading, isSuccess } = useApi

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          isSuccess ? <Jellify /> : <Login />
        </SafeAreaView>
      </NavigationContainer>
    </QueryClientProvider>
  );
}