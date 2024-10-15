import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import _ from "lodash";
import { fetchCredentials } from "./functions/storage";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: fetchCredentials
});