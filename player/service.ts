import TrackPlayer, { Event } from "react-native-track-player";

/**
 * Jellify Playback Service.
 * 
 * Sets up event listeners for remote control events and
 * runs for the duration of the app lifecycle
 */
export async function PlaybackService() {

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemoteSkip, () => {
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });
}