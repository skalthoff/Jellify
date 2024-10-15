import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "../../enums/query-keys"
import _ from "lodash";
import { fetchCredentials, fetchServer } from "./functions/storage";

export const useCredentials = useQuery({
    queryKey: [QueryKeys.Credentials],
    queryFn: fetchCredentials
});

export const useServer = useQuery({
    queryKey: [QueryKeys.ServerUrl],
    queryFn: fetchServer
})