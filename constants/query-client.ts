import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: (1000 * 30), // 30 seconds,
            staleTime: (1000 * 60 * 10), // 10 minutes,
        }
    }
});