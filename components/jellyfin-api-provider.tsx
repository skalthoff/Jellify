import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { JellifyServer } from '../types/JellifyServer';
import { useCredentials, useServer } from '../api/queries/keychain';
import { JellifyLibrary } from '../types/JellifyLibrary';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  setApiClient: React.Dispatch<React.SetStateAction<Api | undefined>>;
  server: JellifyServer | undefined;
  setServer: React.Dispatch<React.SetStateAction<JellifyServer | undefined>>;
  library: JellifyLibrary | undefined;
  setLibrary: React.Dispatch<React.SetStateAction<JellifyLibrary | undefined>>;
}

const JellyfinApiClientContextInitializer = () => {
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const [server, setServer] = useState<JellifyServer | undefined>(undefined);
    const [library, setLibrary] = useState<JellifyLibrary | undefined>(undefined);

    const { data: api, isPending: apiPending } = useApi();
    const { data: jellyfinServer, isPending: serverPending } = useServer();
    const { data: credentials, isPending: credentialsPending } = useCredentials();

    useEffect(() => {
      setApiClient(api);
      setServer(jellyfinServer);
    }, [
      api,
      apiPending,
      credentials, 
      credentialsPending,
      jellyfinServer,
      serverPending,
    ]);

    return { 
      apiClient,
      setApiClient, 
      server,
      setServer, 
      library, 
      setLibrary, 
    };
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    setApiClient: () => {},
    server: undefined,
    setServer: () => {},
    library: undefined,
    setLibrary: () => {},
  });

export const JellyfinApiClientProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
  const { 
    apiClient, 
    setApiClient, 
    server, 
    setServer, 
    library,
    setLibrary,
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      setApiClient, 
      server, 
      setServer, 
      library,
      setLibrary
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)