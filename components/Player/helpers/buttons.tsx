import { State } from "react-native-track-player";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Spinner, View } from "tamagui";
import Icon from "../../Global/helpers/icon";
import { usePlayerContext } from "../../../player/provider";
import IconButton from "@/components/Global/helpers/icon-button";

export default function PlayPauseButton() : React.JSX.Element {

    const { playbackState, useTogglePlayback } = usePlayerContext();

    let button : React.JSX.Element;

    switch (playbackState) {
        case (State.Playing) : {
            button = <IconButton name="pause" onPress={() => useTogglePlayback.mutate(undefined)} />;
            break;
        }
    
        case (State.Buffering) :
        case (State.Loading) : {
            button = <Spinner marginHorizontal={10} size="small" color={Colors.Primary}/>;
            break;
        }
        
        default : {
            button = <IconButton name="play" onPress={() => useTogglePlayback.mutate(undefined)} />
            break;
        }
    }

    return (
        <View justifyContent="center" alignItems="center">
            { button }
        </View>
    );
}