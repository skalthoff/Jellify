import './gesture-handler';
import "./global.css";
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
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from "react-native-file-access";

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

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