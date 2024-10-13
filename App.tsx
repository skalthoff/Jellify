import './gesture-handler';
import React from 'react';

import { usePlayer } from './player/queries';
import Jellify from './components/Jellify/component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App(): React.JSX.Element {

  const queryClient = new QueryClient();

  usePlayer;

  return (
    <QueryClientProvider client={queryClient}>
      <Jellify />
    </QueryClientProvider>
  );
}