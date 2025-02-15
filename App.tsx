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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryKeys } from './enums/query-keys';
import { useQuery } from '@tanstack/react-query';
import TrackPlayer, { IOSCategory, IOSCategoryOptions } from 'react-native-track-player';
import { CAPABILITIES } from './player/constants';

// export const backgroundRuntime = createWorkletRuntime('background');

export default function App(): React.JSX.Element {
  
  const isDarkMode = useColorScheme() === 'dark';

  const { isSuccess: isPlayerReady } = useQuery({
      queryKey: [QueryKeys.Player],
      queryFn: async () => {
          await TrackPlayer.setupPlayer({
              autoHandleInterruptions: true,
              maxCacheSize: 1000 * 100, // 100MB, TODO make this adjustable
              iosCategory: IOSCategory.Playback,
              iosCategoryOptions: [
                  IOSCategoryOptions.AllowAirPlay,
                  IOSCategoryOptions.AllowBluetooth,
              ]
          });
          
          return await TrackPlayer.updateOptions({
                  progressUpdateEventInterval: 1,
                  capabilities: CAPABILITIES,
                  notificationCapabilities: CAPABILITIES,
                  compactCapabilities: CAPABILITIES,
                  // ratingType: RatingType.Heart,
                  // likeOptions: {
                  //     isActive: false,
                  //     title: "Favorite"
                  // },
                  // dislikeOptions: {
                  //     isActive: true,
                  //     title: "Unfavorite"
                  // }
          });
      },
      retry: 0,
      staleTime: 1000 * 60 * 60 * 24 * 7 // 7 days
  });

  return (
    <PersistQueryClientProvider 
      client={queryClient} 
      persistOptions={{ 
        persister: clientPersister
    }}>
      <GestureHandlerRootView>
        <TamaguiProvider config={jellifyConfig}>
          <Theme name={isDarkMode ? 'dark' : 'light'}>
              <Jellify />
          </Theme>
        </TamaguiProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}