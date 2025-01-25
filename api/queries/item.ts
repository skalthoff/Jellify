import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../../enums/query-keys";
import { fetchItem } from "./functions/item";

export const useItem = (itemId: string) => useQuery({
    queryKey: [QueryKeys.Item, itemId],
    queryFn: () => fetchItem(itemId)
});