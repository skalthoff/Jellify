import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { usePublicApi } from "../queries";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";

export const usePublicSystemInfo = (serverUrl: string) => useQuery({
    queryKey: [QueryKeys.PublicSystemInfo, serverUrl],
    queryFn: ({ queryKey }) => {
        return getSystemApi(usePublicApi(queryKey[1]).data!).getPublicSystemInfo()
    }
});