import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  apiPending: boolean;
  setApiClient: React.Dispatch<SetStateAction<Api | undefined>>;
}

const JellyfinApiClientContextInitializer = () => {

    const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
    const { data: api, isPending: apiPending, refetch: refetchApi } = useApi();

    useEffect(() => {
      if (!apiPending)
        console.log("Setting API client to stored values")
        setApiClient(api)
    }, [
      apiPending
    ]);

    return { 
      apiClient, 
      apiPending,
      setApiClient,
    };
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiPending: true,
    setApiClient: () => {},
  });

export const JellyfinApiClientProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
  const { 
    apiClient, 
    apiPending, 
    setApiClient,
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient, 
      apiPending, 
      setApiClient,
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)