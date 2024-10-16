import { createContext, Dispatch, SetStateAction } from "react";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../types/JellifyServer";

type LoginContextFns = {
    setServerFn: (state: JellifyServer | undefined) => void,
    setKeychainFn: (state: SharedWebCredentials | undefined) => void,
}

type LoginContext = {
    server: JellifyServer | undefined,
    keychain: SharedWebCredentials | undefined;
    loginContextFns: LoginContextFns
};
/**
 * Default value and structure for login context
 * https://stackoverflow.com/a/58199140
 */
const loginContextDefaultValue : LoginContext = {
    server: undefined,
    keychain: undefined,
    loginContextFns: {
        setKeychainFn: (state: SharedWebCredentials | undefined) => {}, // noop default callback
        setServerFn: (state: JellifyServer | undefined) => {}, //noop default callback
    }
}

export const LoginContext = createContext(loginContextDefaultValue);
