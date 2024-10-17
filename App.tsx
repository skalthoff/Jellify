import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';

export default function App(): React.JSX.Element {

  const queryClient = new QueryClient();

  require('react-native-ui-lib/config').setConfig({appScheme: 'default'});

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
          <Jellify />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}