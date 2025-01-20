import Client from "../api/client";
import { isUndefined } from "lodash";
import { createContext, ReactNode, useContext, useState } from "react";

interface JellifyContext {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const JellifyContextInitializer = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(
        !isUndefined(Client.api) && 
        !isUndefined(Client.user) &&
        !isUndefined(Client.server)
    );

    return {
        loggedIn,
        setLoggedIn,
    }
}

const JellifyContext = createContext<JellifyContext>({
    loggedIn: false,
    setLoggedIn: () => {}
});

export const JellifyProvider: ({ children }: {
    children: ReactNode
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
    const {
        loggedIn,
        setLoggedIn
    } = JellifyContextInitializer();

    return (
        <JellifyContext.Provider
            value={{
                loggedIn,
                setLoggedIn
            }}
            >
                {children}
            </JellifyContext.Provider>
    )
}

export const useJellifyContext = () => useContext(JellifyContext);