import { createContext, Dispatch, SetStateAction } from "react";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../types/JellifyServer";

type LoginContextFns = {
    setKeychainFn: (state: SharedWebCredentials | undefined) => void,
    setServerFn: (state: JellifyServer | undefined) => void
}

type LoginContext = {
    keychain: SharedWebCredentials | undefined;
    server: JellifyServer | undefined,
    loginContextFns: LoginContextFns
};
/**
 * Default value and structure for login context
 * https://stackoverflow.com/a/58199140
 */
const loginContextDefaultValue : LoginContext = {
    keychain: undefined,
    server: undefined,
    loginContextFns: {
        setKeychainFn: (state: SharedWebCredentials | undefined) => {}, // noop default callback
        setServerFn: (state: JellifyServer | undefined) => {}
    }
}

export const LoginContext = createContext(loginContextDefaultValue);
