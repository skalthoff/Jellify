import { Colors } from "@/enums/colors";
import React from "react"
import { trigger } from "react-native-haptic-feedback";
import { Popover as TamaguiPopover, View } from "tamagui"

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
            onOpenChange={() => trigger("impactLight")} 
        >
            <TamaguiPopover.Trigger asChild>
                { props.trigger }
            </TamaguiPopover.Trigger>
      
            <TamaguiPopover.Content>
                <TamaguiPopover.Arrow />
                <TamaguiPopover.Close />
                    { props.children }
            </TamaguiPopover.Content>
      </TamaguiPopover>
    )
}