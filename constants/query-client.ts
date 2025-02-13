import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            //@ts-ignore
            cacheTime: (1000 * 60 * 60) * 24, // 1 day 

            gcTime: (1000 * 60 * 5), // 5 minutes,
            staleTime: (1000 * 60 * 5), // 5 minutes,
        }
    }
});