import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import Jellify from './components/jellify';
import { TamaguiProvider, Theme } from 'tamagui';
import { ToastProvider } from '@tamagui/toast'
import { useColorScheme } from 'react-native';
import jellifyConfig from './tamagui.config';
import { clientPersister } from './constants/storage';
import { queryClient } from './constants/query-client';

export default function App(): React.JSX.Element {
  
  const isDarkMode = useColorScheme() === 'dark';
  
  return (
    <PersistQueryClientProvider 
      client={queryClient} 
      persistOptions={{ 
        persister: clientPersister
    }}>
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
    </PersistQueryClientProvider>
  );
}