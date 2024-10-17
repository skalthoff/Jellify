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
  username: string | undefined;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  changeUser: boolean;
  setChangeUser: React.Dispatch<React.SetStateAction<boolean>>;
  libraryName: string | undefined;
  setLibraryName: React.Dispatch<React.SetStateAction<string>>;
  libraryId: string | undefined;
  setLibraryId: React.Dispatch<React.SetStateAction<string>>;
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

    const [userName, setUserName] = useState<string | undefined>("");
    const [libraryName, setLibraryName] = useState<string>("");
    const [libraryId, setLibraryId] = useState<string>("");

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
      setChangeLibraryRequested,
      userName,
      setUserName,
      libraryName,
      setLibraryName,
      libraryId,
      setLibraryId
    };
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
    username: "",
    setUsername: () => {},
    changeUser: false,
    setChangeUser: () => {},
    libraryName: "",
    setLibraryName: () => {},
    libraryId: "",
    setLibraryId: () => {},
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
    userName,
    setUserName,
    changeUserRequested, 
    setChangeUserRequested, 
    libraryName,
    setLibraryName,
    libraryId,
    setLibraryId,
    changeLibraryRequested, 
    setChangeLibraryRequested
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      setApiClient, 
      apiClientPending: isApiPending, 
      server, 
      setServer, 
      serverPending: isServerPending, 
      changeServer: changeServerRequested, 
      setChangeServer: setChangeServerRequested,
      username: userName,
      setUsername: setUserName,
      changeUser: changeUserRequested, 
      setChangeUser: setChangeUserRequested,
      libraryName: libraryName,
      setLibraryName: setLibraryName,
      libraryId: libraryId,
      setLibraryId: setLibraryId,
      changeLibrary: changeLibraryRequested, 
      setChangeLibrary: setChangeLibraryRequested
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)