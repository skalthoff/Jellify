import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useApi, usePublicApi } from '../api/queries';
import _ from 'lodash';
import { JellifyServer } from '../types/JellifyServer';
import { useCredentials, useServer } from '../api/queries/keychain';
import { JellifyLibrary } from '../types/JellifyLibrary';
import { SharedWebCredentials } from 'react-native-keychain';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  setApiClient: React.Dispatch<React.SetStateAction<Api | undefined>>;
  server: JellifyServer | undefined;
  setServer: React.Dispatch<React.SetStateAction<JellifyServer | undefined>>;
  library: JellifyLibrary | undefined;
  setLibrary: React.Dispatch<React.SetStateAction<JellifyLibrary | undefined>>;
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const JellyfinApiClientContextInitializer = () => {
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const [server, setServer] = useState<JellifyServer | undefined>(undefined);
    const [library, setLibrary] = useState<JellifyLibrary | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>();

    const { data: api, isPending: apiPending } = useApi();
    const { data: jellyfinServer, isPending: serverPending } = useServer();
    const { data: publicApi, isPending: publicApiPending } = usePublicApi(jellyfinServer?.name ?? "");
    const { data: credentials, isPending: credentialsPending } : { data: SharedWebCredentials | undefined, isPending: boolean } = useCredentials();

    useEffect(() => {

      if (!_.isUndefined(api)) {
        console.log("Using authenticated API client")
        setApiClient(api);
      } else if (!_.isUndefined(publicApi)) {
        console.log("Using public API client");
        setApiClient(publicApi)
      } else {
        setApiClient(undefined)
      }
      
      setServer(jellyfinServer);
      setUsername(credentials?.username ?? undefined)
    }, [
      api,
      apiPending,
      publicApi,
      publicApiPending,
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
      username,
      setUsername
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
    username: undefined,
    setUsername: () => {}
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
    username,
    setUsername
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      setApiClient, 
      server, 
      setServer, 
      library,
      setLibrary,
      username,
      setUsername
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)