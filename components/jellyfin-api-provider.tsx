import { Api } from '@jellyfin/sdk';
import React, { createContext, ReactNode, useContext } from 'react';
import { useApi } from '../api/queries';
import _ from 'lodash';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

interface JellyfinApiClientContext {
  apiClient: Api | undefined;
  apiPending: boolean;
  refetchApi: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Api, Error>>;
}

const JellyfinApiClientContextInitializer = () => {

    const { data: api, isPending: apiPending, refetch: refetchApi } = useApi();

    return { 
      api,
      apiPending, 
      refetchApi,
    };
}

export const JellyfinApiClientContext =
  createContext<JellyfinApiClientContext>({ 
    apiClient: undefined, 
    apiPending: true,
    refetchApi: () => new Promise(() => {}),
  });

export const JellyfinApiClientProvider: ({ children }: {
  children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
  const { 
    api, 
    apiPending, 
    refetchApi,
   } = JellyfinApiClientContextInitializer();

  // Add your logic to check if credentials are stored and initialize the API client here.

  return (
    <JellyfinApiClientContext.Provider value={{ 
      apiClient: api, 
      apiPending, 
      refetchApi,
    }}>
        {children}
    </JellyfinApiClientContext.Provider>
  );
};

export const useApiClientContext = () => useContext(JellyfinApiClientContext)