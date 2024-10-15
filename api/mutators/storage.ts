import { useMutation } from "@tanstack/react-query";
import { MutationKeys } from "../../enums/mutation-keys";

import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { mutateServerCredentials } from "./functions/storage";

export const credentials = useMutation({
    mutationKey: [MutationKeys.Credentials],
    mutationFn: async (credentials: JellyfinCredentials) => {
        return mutateServerCredentials(credentials)
    },
});