import { QueryKeys } from "@/enums/query-keys"
import { useQuery } from "@tanstack/react-query"
import TrackPlayer, { Capability } from "react-native-track-player"

const CAPABILITIES: Capability[] = [
    Capability.Pause,
    Capability.Play,
    Capability.SeekTo,
  ]
  
export const useSetupPlayer = () => useQuery({
    queryKey: [QueryKeys.Player],
    queryFn: async () => {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.updateOptions({
            progressUpdateEventInterval: 1,
            capabilities: CAPABILITIES,
            notificationCapabilities: CAPABILITIES,
            compactCapabilities: CAPABILITIES
        })
    }
})