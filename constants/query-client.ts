import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: (1000 * 60 * 60 * 24), // 1 day,
            staleTime: (1000 * 60 * 10), // 10 minutes,
        }
    }
});