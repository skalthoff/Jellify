import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: (1000 * 60 * 15), // 15 minutes
            staleTime: (1000 * 60 * 10) // 10 minutes
        }
    }
});