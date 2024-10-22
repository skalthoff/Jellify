import React, { createContext, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useCredentials, useServer } from "../../api/queries/keychain";
import _ from "lodash";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../../types/JellifyServer";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { mutateServer, mutateServerCredentials } from "../../api/mutators/functions/storage";

interface JellyfinAuthenticationContext {
    username: string | undefined;
    setUsername: React.Dispatch<SetStateAction<string | undefined>>;
    changeUsername: boolean;
    setChangeUsername: React.Dispatch<SetStateAction<boolean>>;
    useHttp: boolean;
    setUseHttp: React.Dispatch<SetStateAction<boolean>>;
    useHttps: boolean;
    setUseHttps: React.Dispatch<SetStateAction<boolean>>;
    serverAddress: string | undefined;
    setServerAddress: React.Dispatch<SetStateAction<string | undefined>>;
    changeServer: boolean;
    setChangeServer: React.Dispatch<SetStateAction<boolean>>;
    storedServer: JellifyServer | undefined;
    refetchServer: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<JellifyServer, Error>>;
    libraryName: string | undefined;
    setLibraryName: React.Dispatch<React.SetStateAction<string | undefined>>;
    libraryId: string | undefined;
    setLibraryId: React.Dispatch<React.SetStateAction<string | undefined>>;
    triggerAuth: boolean;
    setTriggerAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const JellyfinAuthenticationContextInitializer = () => {
    const [username, setUsername] = useState<string | undefined>(undefined);
    const [changeUsername, setChangeUsername] = useState<boolean>(false);

    const [useHttp, setUseHttp] = useState<boolean>(false);
    const [useHttps, setUseHttps] = useState<boolean>(true);
    const [serverAddress, setServerAddress] = useState<string | undefined>(undefined);
    const [changeServer, setChangeServer] = useState<boolean>(false);

    const [libraryName, setLibraryName] = useState<string | undefined>(undefined);
    const [libraryId, setLibraryId] = useState<string | undefined>(undefined);

    const [triggerAuth, setTriggerAuth] = useState<boolean>(true);

    // Fetch from storage on init to load non-sensitive fields from previous logins
    const { data: storedServer, isPending: serverPending, refetch: refetchServer } = useServer();
    const { data: credentials, isPending: credentialsPending } : { data: SharedWebCredentials | undefined, isPending: boolean } = useCredentials();

    useEffect(() => {
        if (!_.isUndefined(storedServer)) {
            setServerAddress(storedServer.url);
        }

        if (!_.isUndefined(credentials)) {
            setUsername(credentials.username)
        }
    }, [
        serverPending,
        credentialsPending
    ]);

    // Remove stored creds if a change is requested
    useEffect(() => {
        if (changeUsername)
            mutateServerCredentials();

        if (changeServer)
            mutateServer();
    }, [
        changeUsername,
        changeServer
    ])

    return {
        username,
        setUsername,
        changeUsername,
        setChangeUsername,
        useHttp,
        setUseHttp,
        useHttps,
        setUseHttps,
        serverAddress,
        setServerAddress,
        changeServer,
        setChangeServer,
        storedServer,
        refetchServer,
        libraryName,
        setLibraryName,
        libraryId,
        setLibraryId,
        triggerAuth,
        setTriggerAuth
    };
}

const JellyfinAuthenticationContext = 
    createContext<JellyfinAuthenticationContext>({
        username: undefined,
        setUsername: () => {},
        changeUsername: false,
        setChangeUsername: () => {},
        useHttp: false,
        setUseHttp: () => {},
        useHttps: true,
        setUseHttps: () => {},
        serverAddress: undefined,
        setServerAddress: () => {},
        changeServer: false,
        setChangeServer: () => {},
        storedServer: undefined,
        refetchServer: () => new Promise(() => {}),
        libraryName: undefined,
        setLibraryName: () => {},
        libraryId: undefined, 
        setLibraryId: () => {},
        triggerAuth: true,
        setTriggerAuth: () => {},
});

export const JellyfinAuthenticationProvider: ({ children }: {
    children: ReactNode;
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {

    const {
        username,
        setUsername,
        changeUsername,
        setChangeUsername,
        useHttp,
        setUseHttp,
        useHttps,
        setUseHttps,
        serverAddress,
        setServerAddress,
        changeServer,
        setChangeServer,
        storedServer,
        refetchServer,
        libraryName,
        setLibraryName,
        libraryId,
        setLibraryId,
        triggerAuth,
        setTriggerAuth,
    } = JellyfinAuthenticationContextInitializer();

    return (
        <JellyfinAuthenticationContext.Provider value={{
            username,
            setUsername,
            changeUsername,
            setChangeUsername,
            useHttp,
            setUseHttp,
            useHttps,
            setUseHttps,
            serverAddress,
            setServerAddress,
            changeServer,
            setChangeServer,
            storedServer,
            refetchServer,
            libraryName,
            setLibraryName,
            libraryId,
            setLibraryId,
            triggerAuth,
            setTriggerAuth,
        }}>
            { children }
        </JellyfinAuthenticationContext.Provider>
    );
};

export const useAuthenticationContext = () => useContext(JellyfinAuthenticationContext)