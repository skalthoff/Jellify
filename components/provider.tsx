import Client from "../api/client";
import { isUndefined } from "lodash";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CarPlay } from "react-native-carplay";
import CarPlayNavigation from "./CarPlay/Navigation";
import CarPlayNowPlaying from "./CarPlay/NowPlaying";

interface JellifyContext {
    loggedIn: boolean;
    carPlayConnected: boolean;
}

const JellifyContextInitializer = () => {

    const [loggedIn, setLoggedIn] = useState<boolean>(
        !isUndefined(Client.api) && 
        !isUndefined(Client.user) &&
        !isUndefined(Client.server)
    );

    useEffect(() => {
        setLoggedIn(
            !isUndefined(Client.api) && 
            !isUndefined(Client.user) &&
            !isUndefined(Client.server)    
        )
    }, [
        Client.instance
    ]);


    const [carPlayConnected, setCarPlayConnected] = useState(CarPlay.connected);

    useEffect(() => {
  
      function onConnect() {
        setCarPlayConnected(true);
        // CarPlay.setRootTemplate(CarPlayNowPlaying, true);
        CarPlay.enableNowPlaying(true);
      }
  
      function onDisconnect() {
        setCarPlayConnected(false);
      }
  
      CarPlay.registerOnConnect(onConnect);
      CarPlay.registerOnDisconnect(onDisconnect);
      return () => {
        CarPlay.unregisterOnConnect(onConnect)
        CarPlay.unregisterOnDisconnect(onDisconnect)
      };
    });

    return {
        loggedIn,
        carPlayConnected
    }
}

const JellifyContext = createContext<JellifyContext>({
    loggedIn: false,
    carPlayConnected: false
});

export const JellifyProvider: ({ children }: {
    children: ReactNode
}) => React.JSX.Element = ({ children }: { children: ReactNode }) => {
    const {
        loggedIn,
        carPlayConnected
    } = JellifyContextInitializer();

    return (
        <JellifyContext.Provider
            value={{
                loggedIn,
                carPlayConnected
            }}
            >
                {children}
            </JellifyContext.Provider>
    )
}

export const useJellifyContext = () => useContext(JellifyContext);