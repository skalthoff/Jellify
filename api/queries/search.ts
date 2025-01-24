import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { search } from "./functions/search";

export const useSearch = (searchString: string | undefined) => useQuery({
    queryKey: [QueryKeys.Search, searchString],
    queryFn: () => search(searchString)
})