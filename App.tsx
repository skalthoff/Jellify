import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(): React.JSX.Element {

  const queryClient = new QueryClient();


  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{flex: 1}}>
          <Jellify />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}