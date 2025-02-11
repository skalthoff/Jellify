import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: (1000 * 60 * 60), // 1 hour
            staleTime: (1000 * 60 * 30) // 30 minutes
        }
    }
});