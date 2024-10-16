import { createContext, Dispatch, SetStateAction } from "react";
import { SharedWebCredentials } from "react-native-keychain";
import { JellifyServer } from "../types/JellifyServer";

export type LoginContextFns = {
    setKeychainFn: (state: SharedWebCredentials | undefined) => void,
}

type LoginContext = {
    keychain: SharedWebCredentials | undefined;
    loginContextFns: LoginContextFns
};
/**
 * Default value and structure for login context
 * https://stackoverflow.com/a/58199140
 */
const loginContextDefaultValue : LoginContext = {
    keychain: undefined,
    loginContextFns: {
        setKeychainFn: (state: SharedWebCredentials | undefined) => {}, // noop default callback
    }
}

export const LoginContext = createContext(loginContextDefaultValue);
