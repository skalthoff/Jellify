import React from "react";
import { SliderProps as TamaguiSliderProps, SliderVerticalProps, Slider as TamaguiSlider, styled, Slider, getTokens } from "tamagui";

interface SliderProps {
    value?: number | undefined;
    max: number;
    width?: number | undefined
    props: TamaguiSliderProps
}

const JellifySliderThumb = styled(Slider.Thumb, {
    backgroundColor: getTokens().color.$purpleDark,
    borderColor: getTokens().color.$amethyst,
})

const JellifySliderTrack = styled(Slider.Track, {
    backgroundColor: getTokens().color.$amethyst
});

const JellifyActiveSliderTrack = styled(Slider.TrackActive, {
    backgroundColor: getTokens().color.$telemagenta
})

export function HorizontalSlider({ 
    value, 
    max,
    width, 
    props 
}: { 
    value?: number | undefined, 
    max: number;
    width?: number | undefined, 
    props?: TamaguiSliderProps | undefined
}) : React.JSX.Element {
    
    return (
        <TamaguiSlider 
            size="$4" 
            width={width} 
            value={value ? [value] : []}
            max={max} 
            step={1}
            orientation="horizontal"
            marginHorizontal={10}
            { ...props }
        >
            <JellifySliderTrack>
                <JellifyActiveSliderTrack />
            </JellifySliderTrack>
            <JellifySliderThumb circular index={0} size={"$3"} />
        </TamaguiSlider>
    )
}
  
export function VerticalSlider(props: SliderVerticalProps) : React.JSX.Element {

    return ( 
        <TamaguiSlider 
            size="$3" 
            width={200} 
            defaultValue={[0]} 
            max={100} 
            step={1}
            orientation="vertical"
            marginVertical={10}
        >
            <JellifySliderTrack>
                <JellifyActiveSliderTrack />
            </JellifySliderTrack>
            <JellifySliderThumb circular index={0} size={"$2"} />
        </TamaguiSlider>
    )
}