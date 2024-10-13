import { useMutation } from "@tanstack/react-query";
import { usePublicApi } from "../queries";
import { useServerUrl } from "../queries/storage";
import { JellyfinCredentials } from "../types/jellyfin-credentials";
import { MutationKeys } from "../../enums/mutation-keys";

export const authenticateWithCredentials = useMutation({
    mutationKey: [MutationKeys.AuthenticationWithCredentials],
    mutationFn: (credentials: JellyfinCredentials) => {
        return usePublicApi(useServerUrl.data!).data!.authenticateUserByName(credentials.username, credentials.password!);
    },
})