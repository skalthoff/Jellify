import './gesture-handler';
import "./global.css";
import React from 'react';

import Jellify from './components/jellify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';
import { GluestackUIProvider } from './components/ui/gluestack-ui-provider';

export default function App(): React.JSX.Element {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={'dark'}>
        <Jellify />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}