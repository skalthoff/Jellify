import { Api } from '@jellyfin/sdk';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { JellifyServer } from '../types/JellifyServer';
import { useServer } from '../api/queries/keychain';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  apiClientPending: boolean;
  setApiClient: React.Dispatch<React.SetStateAction<Api | undefined>>;
  server: JellifyServer | undefined;
  serverPending: boolean;
  setServer: React.Dispatch<React.SetStateAction<JellifyServer | undefined>>;
}

const JellyfinApiClientContextInitializer = () => {
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const [server, setServer] = useState<JellifyServer | undefined>(undefined);

    const [isServerPending, setIsServerPending] = useState<boolean>(true);
    const [isApiPending, setIsApiPending] = useState<boolean>(true);

    const { data: api, isPending: apiPending } = useApi();
    const { data: jellyfinServer, isPending: serverPending } = useServer();

    useEffect(() => {
      setApiClient(api);
      setServer(jellyfinServer);
      setIsApiPending(apiPending);
      setIsServerPending(serverPending);
    }, [
      api,
      apiPending,
      jellyfinServer,
      serverPending
    ]);

    return { apiClient, setApiClient, isApiPending, server, setServer, isServerPending }
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiClientPending: true,
    setApiClient: () => {},
    server: undefined,
    serverPending: true,
    setServer: () => {},
  });

export const JellyfinApiClientProvider = ({ children }: { children: ReactNode }) => {
  const { apiClient, setApiClient, isApiPending, server, setServer, isServerPending } = JellyfinApiClientContextInitializer();;

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ apiClient, setApiClient, apiClientPending: isApiPending, server, setServer, serverPending: isServerPending }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)