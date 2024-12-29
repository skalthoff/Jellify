import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { storage } from '../constants/storage';
import { MMKVStorageKeys } from '../enums/mmkv-storage-keys';
import { JellifyServer } from '../types/JellifyServer';
import { JellifyLibrary } from '../types/JellifyLibrary';
import { JellifyUser } from '../types/JellifyUser';
import { uuid } from "uuidv4";

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  apiPending: boolean;
  sessionId: string;
  server: JellifyServer | undefined;
  setServer: React.Dispatch<SetStateAction<JellifyServer | undefined>>;
  user: JellifyUser | undefined;
  setUser: React.Dispatch<SetStateAction<JellifyUser | undefined>>;
  library: JellifyLibrary | undefined;
  setLibrary: React.Dispatch<SetStateAction<JellifyLibrary | undefined>>;
  signOut: () => void
}

const JellyfinApiClientContextInitializer = () => {

    const userJson = storage.getString(MMKVStorageKeys.User)
    const serverJson = storage.getString(MMKVStorageKeys.Server);
    const libraryJson = storage.getString(MMKVStorageKeys.Library);

    const [sessionId, setSessionId] = useState<string>(uuid())
    const [user, setUser] = useState<JellifyUser | undefined>(userJson ? (JSON.parse(userJson) as JellifyUser) : undefined);
    const [server, setServer] = useState<JellifyServer | undefined>(serverJson ? (JSON.parse(serverJson) as JellifyServer) : undefined);
    const [library, setLibrary] = useState<JellifyLibrary | undefined>(libraryJson ? (JSON.parse(libraryJson) as JellifyLibrary) : undefined);
    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const { data: api, isPending: apiPending, refetch: refetchApi } = useApi(server?.url ?? undefined, user?.name, undefined, user?.accessToken);

    const signOut = () => {
      console.debug("Signing out of Jellify");
      setUser(undefined);
      setServer(undefined);
      setLibrary(undefined);
    }

    useEffect(() => {
      if (!apiPending)
        console.log("Setting API client to stored values")
        setApiClient(api)
    }, [
      apiPending
    ]);

    useEffect(() => {
      console.debug("Access Token or Server changed, creating new API client");
      refetchApi()
    }, [
      server,
      user
    ])

    useEffect(() => {
      if (server) {
        console.debug("Storing new server configuration")
        storage.set(MMKVStorageKeys.Server, JSON.stringify(server))
      }
      else {
        console.debug("Deleting server configuration from storage");
        storage.delete(MMKVStorageKeys.Server)
      }
    }, [
      server
    ])

    useEffect(() => {
      if (user) {
        console.debug("Storing new user profile")
        storage.set(MMKVStorageKeys.User, JSON.stringify(user));
      }
      else {
        console.debug("Deleting access token from storage");
        storage.delete(MMKVStorageKeys.User);
      }
    }, [
      user
    ])

    useEffect(() => {
      console.debug("Library changed")
      if (library) {
        console.debug("Setting library");
        storage.set(MMKVStorageKeys.Library, JSON.stringify(library));
      } else
        storage.delete(MMKVStorageKeys.Library)
    }, [
      library
    ])

    return { 
      apiClient, 
      apiPending,
      sessionId,
      server,
      setServer,
      user, 
      setUser,
      library,
      setLibrary,
      signOut
    };
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiPending: true,
    sessionId: "",
    server: undefined,
    setServer: () => {},
    user: undefined,
    setUser: () => {},
    library: undefined,
    setLibrary: () => {},
    signOut: () => {}
  });

export const JellyfinApiClientProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
  const { 
    apiClient, 
    apiPending, 
    sessionId,
    server,
    setServer,
    user,
    setUser,
    library,
    setLibrary,
    signOut
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      apiPending, 
      sessionId,
      server,
      setServer,
      user,
      setUser,
      library,
      setLibrary,
      signOut
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)