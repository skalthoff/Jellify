import { QueryKeys } from "../../enums/query-keys";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchSuggestions } from "./functions/suggestions";

export const useSearchSuggestions = () => useQuery({
    queryKey: [QueryKeys.SearchSuggestions],
    queryFn: () => fetchSearchSuggestions()
})