import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";
import defaultConfig from '@tamagui/config/v3'

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { ToastProvider } from '@tamagui/toast';

export default function App(): React.JSX.Element {

  const queryClient = new QueryClient();

  const config = createTamagui(defaultConfig)

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <ToastProvider>
          <Jellify />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}