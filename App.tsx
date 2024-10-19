import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTamagui, TamaguiProvider, Theme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast'
import defaultConfig from '@tamagui/config/v3';
import { useColorScheme } from 'react-native';

const config = createTamagui(defaultConfig);

export default function App(): React.JSX.Element {
  
  const queryClient = new QueryClient();

  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <Theme name={isDarkMode ? 'dark' : 'light'}>
          <ToastProvider
            swipeDirection='down'
            native={false}
            >
            <Jellify />
          </ToastProvider>
        </Theme>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}