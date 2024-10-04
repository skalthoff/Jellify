import { useQuery } from "@tanstack/react-query";
import { removeUpcomingTracks } from "react-native-track-player/lib/src/trackPlayer";

export const useClearQueue = useQuery({
    queryKey: [],
    queryFn: () => {
        return removeUpcomingTracks();
    }
})