import TrackPlayer, { Event } from "react-native-track-player";

export const PlaybackService = async function() {

    console.debug("Registering playback service");
    TrackPlayer.setupPlayer();

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

    TrackPlayer.addEventListener(Event.RemoteSkip, () => TrackPlayer.skipToNext());
    TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
}