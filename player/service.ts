import Client from "@/api/client";
import { JellifyTrack } from "@/types/JellifyTrack";
import { getUserLibraryApi } from "@jellyfin/sdk/lib/utils/api";
import TrackPlayer, { Event } from "react-native-track-player";
import { getActiveTrack } from "react-native-track-player/lib/src/trackPlayer";

/**
 * Jellify Playback Service.
 * 
 * Sets up event listeners for remote control events and
 * runs for the duration of the app lifecycle
 */
export async function PlaybackService() {

    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        await TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        await TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, async () => {
        await TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, async () => {
        await TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.RemoteSeek, async (event) => {
        await TrackPlayer.seekTo(event.position);
    });

    TrackPlayer.addEventListener(Event.RemoteLike, async () => {
        await getUserLibraryApi(Client.instance.api!)
            .markFavoriteItem({
                itemId: (await getActiveTrack() as JellifyTrack).item.Id!
            });
    });

    TrackPlayer.addEventListener(Event.RemoteDislike, async () => {
        await getUserLibraryApi(Client.instance.api!)
            .markFavoriteItem({
                itemId: (await getActiveTrack() as JellifyTrack).item.Id!
            });
    });
}