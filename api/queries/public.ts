import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import { createPublicApi } from "./functions/api";

export const usePublicSystemInfo = (serverUrl: string) => useQuery({
    queryKey: [QueryKeys.PublicSystemInfo, serverUrl],
    queryFn: ({ queryKey }) => {
        return getSystemApi(createPublicApi(queryKey[1]))
            .getPublicSystemInfo()
    }
});