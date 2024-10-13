import { useQuery } from "@tanstack/react-query";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";

/**
 * Sets up track player so it's ready for use
 */
export const usePlayer = useQuery({
    queryKey: [],
    queryFn: () => {
        return setupPlayer();
    }
})