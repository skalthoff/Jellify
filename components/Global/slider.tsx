import React from "react";
import { Slider as TamaguiSlider } from "tamagui";

export default function Slider() : React.JSX.Element {
    
    return (
        <TamaguiSlider size="$4" width={200} defaultValue={[50]} max={100} step={1}>
            <TamaguiSlider.Track>
                <TamaguiSlider.TrackActive />
            </TamaguiSlider.Track>
            <TamaguiSlider.Thumb circular index={0} />
        </TamaguiSlider>
    )
}
  