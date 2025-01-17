import React from "react"
import { Popover as TamaguiPopover, View } from "tamagui"

interface PopoverProps {
    children: React.ReactNode;
    anchor: React.ReactNode;
    open: boolean
}

export default function Popover(props: PopoverProps) : React.JSX.Element {
    return (
        <TamaguiPopover open={props.open}>
            <TamaguiPopover.Anchor asChild>
                { props.anchor }
            </TamaguiPopover.Anchor>
      
            <TamaguiPopover.Content>
            <TamaguiPopover.Arrow />
            <TamaguiPopover.Close />
            <View>
                { props.children }
            </View>
          </TamaguiPopover.Content>
      </TamaguiPopover>
    )
}