import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
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
  changeServer: boolean;
  setChangeServer: React.Dispatch<React.SetStateAction<boolean>>;
  changeUser: boolean;
  setChangeUser: React.Dispatch<React.SetStateAction<boolean>>;
  changeLibrary: boolean;
  setChangeLibrary: React.Dispatch<React.SetStateAction<boolean>>;
}

const JellyfinApiClientContextInitializer = () => {
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const [server, setServer] = useState<JellifyServer | undefined>(undefined);

    const [isServerPending, setIsServerPending] = useState<boolean>(true);
    const [isApiPending, setIsApiPending] = useState<boolean>(true);

    const [changeServerRequested, setChangeServerRequested] = useState<boolean>(false);
    const [changeUserRequested, setChangeUserRequested] = useState<boolean>(false);
    const [changeLibraryRequested, setChangeLibraryRequested] = useState<boolean>(false);

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

    return { 
      apiClient, 
      setApiClient, 
      isApiPending, 
      server, 
      setServer, 
      isServerPending, 
      changeServerRequested, 
      setChangeServerRequested,
      changeUserRequested,
      setChangeUserRequested,
      changeLibraryRequested, 
      setChangeLibraryRequested }
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiClientPending: true,
    setApiClient: () => {},
    server: undefined,
    serverPending: true,
    setServer: () => {},
    changeServer: false,
    setChangeServer: () => {},
    changeUser: false,
    setChangeUser: () => {},
    changeLibrary: false,
    setChangeLibrary: () => {},
  });

export const JellyfinApiClientProvider = ({ children }: { children: ReactNode }) => {
  const { 
    apiClient, 
    setApiClient, 
    isApiPending, 
    server, 
    setServer, 
    isServerPending, 
    changeServerRequested, 
    setChangeServerRequested, 
    changeUserRequested, 
    setChangeUserRequested, 
    changeLibraryRequested, 
    setChangeLibraryRequested
   } = JellyfinApiClientContextInitializer();;

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ apiClient, setApiClient, apiClientPending: isApiPending, server, setServer, serverPending: isServerPending, changeServer: changeServerRequested, changeUser: changeUserRequested, changeLibrary: changeLibraryRequested, setChangeServer: setChangeServerRequested, setChangeLibrary: setChangeLibraryRequested, setChangeUser: setChangeUserRequested }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)