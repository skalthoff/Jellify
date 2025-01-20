import { QueryKeys } from "../../enums/query-keys"
import { useQuery } from "@tanstack/react-query"
import TrackPlayer, { Capability, IOSCategory, IOSCategoryOptions, RatingType } from "react-native-track-player"

const CAPABILITIES: Capability[] = [
    Capability.Pause,
    Capability.Play,
    Capability.PlayFromId,
    Capability.SeekTo,
    Capability.JumpForward,
    Capability.JumpBackward,
    Capability.SkipToNext,
    Capability.SkipToPrevious,
    Capability.Like,
    Capability.Dislike
]
  
export const useSetupPlayer = () => useQuery({
    queryKey: [QueryKeys.Player],
    queryFn: () => {
        return TrackPlayer.setupPlayer({
            autoHandleInterruptions: true,
            iosCategory: IOSCategory.Playback,
            iosCategoryOptions: [
                IOSCategoryOptions.AllowAirPlay,
                IOSCategoryOptions.AllowBluetooth,
            ]
        }).then(() => {
            return TrackPlayer.updateOptions({
                progressUpdateEventInterval: 1,
                capabilities: CAPABILITIES,
                notificationCapabilities: CAPABILITIES,
                compactCapabilities: CAPABILITIES,
                ratingType: RatingType.Heart,
            });
        });
    }
});