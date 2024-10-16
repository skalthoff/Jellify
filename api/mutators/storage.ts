import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/mutation-keys";

import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { mutateServer, mutateServerCredentials } from "./functions/storage";
import { JellifyServer } from "../../types/JellifyServer";

export const jellifyServerMutation = useMutation({
    mutationKey: [MutationKeys.ServerUrl],
    mutationFn: async (server: JellifyServer | undefined) => {
        return mutateServer(server)
    }
});

export const credentials = useMutation({
    mutationKey: [MutationKeys.Credentials],
    mutationFn: async (credentials: JellyfinCredentials) => {
        return mutateServerCredentials(credentials)
    },
});