import { Colors } from "@/enums/colors";
import React from "react"
import { trigger } from "react-native-haptic-feedback";
import { Adapt, Popover as TamaguiPopover, View } from "tamagui"

interface PopoverProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
}

export default function Popover(props: PopoverProps) : React.JSX.Element {
    return (
        <TamaguiPopover 
            size="$5"
            stayInFrame
            offset={1}
        >
            <TamaguiPopover.Trigger asChild>
                { props.trigger }
            </TamaguiPopover.Trigger>
      
            { /* Tamagui doesn't support Popovers on Native, so we adapt it to a sheet */ }
            <Adapt when="sm" platform="touch">
                <TamaguiPopover.Sheet modal dismissOnSnapToBottom>
                    <TamaguiPopover.Sheet.Frame>
                        <Adapt.Contents />
                    </TamaguiPopover.Sheet.Frame>

                    <TamaguiPopover.Sheet.Overlay
                        animation="lazy"
                    />
                </TamaguiPopover.Sheet>
            </Adapt>
            <TamaguiPopover.Content>
                <TamaguiPopover.Arrow />
                <TamaguiPopover.Close />
                    { props.children }
            </TamaguiPopover.Content>
      </TamaguiPopover>
    )
}