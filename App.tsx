import './gesture-handler';
import React from 'react';
import "react-native-url-polyfill/auto";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import Jellify from './components/jellify';
import { TamaguiProvider, Theme } from 'tamagui';
import { useColorScheme } from 'react-native';
import jellifyConfig from './tamagui.config';
import { clientPersister } from './constants/storage';
import { queryClient } from './constants/query-client';
import { EventProvider } from "react-native-outside-press";

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
            <EventProvider>
              <Jellify />
            </EventProvider>
        </Theme>
      </TamaguiProvider>
    </PersistQueryClientProvider>
  );
}