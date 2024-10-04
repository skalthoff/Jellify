import { useQuery } from "@tanstack/react-query";
import { setupPlayer } from "react-native-track-player/lib/src/trackPlayer";

export const usePlayer = useQuery({
    queryKey: [],
    queryFn: () => {
        return setupPlayer();
    }
})