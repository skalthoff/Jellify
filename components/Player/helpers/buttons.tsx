import { State } from "react-native-track-player";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Spinner } from "tamagui";
import Icon from "../../Global/icon";

export function playPauseButton(playbackState: State | undefined, play: Function, pause: Function) {

    let button : React.JSX.Element;

    console.debug(`Playback State: ${playbackState}`)

    switch (playbackState) {
        case (State.Playing) : {
            button = <Icon name="pause" large onPress={() => pause()} />
        }
    
        case (State.Buffering) :
        case (State.Loading) : {
            button = <Spinner size="small" color={Colors.Primary}/>
        }
        
        default : {
            button = <Icon name="play" large onPress={() => play()} />
        }
    }

    return button;
}