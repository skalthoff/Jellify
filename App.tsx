import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TamaguiProvider, Theme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast'
import { useColorScheme } from 'react-native';
import jellifyConfig from './tamagui.config';

export default function App(): React.JSX.Element {
  
  const queryClient = new QueryClient();

  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={jellifyConfig}>
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