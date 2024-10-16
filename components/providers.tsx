import React, { useMemo } from "react"
import { LoginContext, LoginContextFns } from "./contexts"
import { useCredentials } from "../api/queries/keychain"
import { QueryObserverResult } from "@tanstack/react-query"
import { SharedWebCredentials } from "react-native-keychain"

type LoginProviderProps = {
    loginContextFns: LoginContextFns
}

export default function LoginProvider(props: React.PropsWithChildren<LoginProviderProps>): React.JSX.Element {

    const { data: keychain, isPending } = useCredentials;

    const loginContextFns = props.loginContextFns

    const loginContext = useMemo(() => ({keychain, isPending, loginContextFns}),
        [keychain, isPending, loginContextFns] 
    );

    return (
        <LoginContext.Provider value={loginContext}>
            {props.children}
        </LoginContext.Provider>
    )
}