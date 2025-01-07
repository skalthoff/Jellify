import { QueryKeys } from "@/enums/query-keys"
import { useQuery } from "@tanstack/react-query"
import TrackPlayer, { Capability } from "react-native-track-player"

const CAPABILITIES: Capability[] = [
    Capability.Pause,
    Capability.Play,
    Capability.PlayFromId,
    Capability.SeekTo,
    Capability.Skip,
    Capability.SkipToNext,
    Capability.SkipToPrevious
  ]
  
export const useSetupPlayer = () => useQuery({
    queryKey: [QueryKeys.Player],
    queryFn: async () => {
        return TrackPlayer.setupPlayer().then(() => {
            return TrackPlayer.updateOptions({
                progressUpdateEventInterval: 1,
                capabilities: CAPABILITIES,
                notificationCapabilities: CAPABILITIES,
                compactCapabilities: CAPABILITIES
            });
        });
    }
});