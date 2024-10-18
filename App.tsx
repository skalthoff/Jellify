import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTamagui, TamaguiProvider } from 'tamagui';
import defaultConfig from '@tamagui/config/v3';

const config = createTamagui(defaultConfig);

export default function App(): React.JSX.Element {
  
  const queryClient = new QueryClient();

  
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
          <Jellify />
      </TamaguiProvider>
    </QueryClientProvider>
  );
}