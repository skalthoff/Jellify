import { useMutation } from "@tanstack/react-query";
import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { MutationKeys } from "../../enums/mutation-keys";
import { createPublicApi } from "../queries/functions/api";
import { fetchServerUrl } from "../queries/functions/storage";

export const authenticateWithCredentials = useMutation({
    mutationKey: [MutationKeys.AuthenticationWithCredentials],
    mutationFn: async (credentials: JellyfinCredentials) => {
        createPublicApi(await fetchServerUrl())
        .authenticateUserByName(credentials.username, credentials.password!);
    },
    onSuccess(data, credentials, context) {
        
    },
})