import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { storage } from '../constants/storage';
import { MMKVStorageKeys } from '../enums/mmkv-storage-keys';
import { JellifyServer } from '../types/JellifyServer';
import { JellifyLibrary } from '../types/JellifyLibrary';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  apiPending: boolean;
  server: JellifyServer | undefined;
  setServer: React.Dispatch<SetStateAction<JellifyServer | undefined>>;
  username: string | undefined;
  setUsername: React.Dispatch<SetStateAction<string | undefined>>;
  accessToken: string | undefined;
  setAccessToken: React.Dispatch<SetStateAction<string | undefined>>;
  library: JellifyLibrary | undefined;
  setLibrary: React.Dispatch<SetStateAction<JellifyLibrary | undefined>>;
}

const JellyfinApiClientContextInitializer = () => {

    let serverJson = storage.getString(MMKVStorageKeys.Server);
    let libraryJson = storage.getString(MMKVStorageKeys.Library);

    const [username, setUsername] = useState<string | undefined>(storage.getString(MMKVStorageKeys.Username));
    const [accessToken, setAccessToken] = useState<string | undefined>(storage.getString(MMKVStorageKeys.AccessToken));
    const [server, setServer] = useState<JellifyServer | undefined>(serverJson ? (JSON.parse(serverJson) as JellifyServer) : undefined);
    const [library, setLibrary] = useState<JellifyLibrary | undefined>(libraryJson ? (JSON.parse(libraryJson) as JellifyLibrary) : undefined);
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const { data: api, isPending: apiPending, refetch: refetchApi } = useApi(server?.url ?? undefined, username, undefined, accessToken);

    useEffect(() => {
      if (!apiPending)
        console.log("Setting API client to stored values")
        setApiClient(api)
    }, [
      apiPending
    ]);

    useEffect(() => {
      refetchApi()
    }, [
      server,
      accessToken
    ])

    useEffect(() => {
      if (server)
        storage.set(MMKVStorageKeys.Server, JSON.stringify(server))
      else 
        storage.delete(MMKVStorageKeys.Server)
    }, [
      server
    ])

    useEffect(() => {
      if (accessToken)
        storage.set(MMKVStorageKeys.AccessToken, accessToken);
      else
        storage.delete(MMKVStorageKeys.AccessToken);
    }, [
      accessToken
    ])

    useEffect(() => {
      console.debug("Library changed")
      if (library)
        storage.set(MMKVStorageKeys.Library, JSON.stringify(library));
      else
        storage.delete(MMKVStorageKeys.Library)
    }, [
      library
    ])

    return { 
      apiClient, 
      apiPending,
      server,
      setServer,
      username, 
      setUsername,
      accessToken,
      setAccessToken,
      library,
      setLibrary
    };
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiPending: true,
    server: undefined,
    setServer: () => {},
    username: undefined,
    setUsername: () => {},
    accessToken: undefined,
    setAccessToken: () => {},
    library: undefined,
    setLibrary: () => {},
  });

export const JellyfinApiClientProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
  const { 
    apiClient, 
    apiPending, 
    server,
    setServer,
    username,
    setUsername,
    accessToken,
    setAccessToken,
    library,
    setLibrary
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      apiPending, 
      server,
      setServer,
      username,
      setUsername,
      accessToken,
      setAccessToken,
      library,
      setLibrary
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)