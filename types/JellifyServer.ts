import { JellifyLibrary } from "./JellifyLibrary";

export interface JellifyServer {
    url: string;
    name: string;
    version: string;
    startUpComplete: boolean;
    library?: JellifyLibrary;
}