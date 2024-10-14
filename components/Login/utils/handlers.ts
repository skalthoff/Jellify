import { validateServerUrl } from "./validation";

export function handleServerUrlChangeEvent(serverUrl: string | undefined, setServerUrl: React.Dispatch<React.SetStateAction<string | undefined>>) : void {
    if (validateServerUrl(serverUrl)) {
        setServerUrl(serverUrl);
    }
}