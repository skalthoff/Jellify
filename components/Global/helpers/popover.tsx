import React from "react"
import { trigger } from "react-native-haptic-feedback";
import { Popover as TamaguiPopover, View } from "tamagui"

interface PopoverProps {
    children: React.ReactNode;
    anchor: React.ReactNode;
    open: boolean
}

export default function Popover(props: PopoverProps) : React.JSX.Element {
    return (
        <TamaguiPopover 
            onOpenChange={() => trigger("impactLight")} 
            open={props.open}
        >
            <TamaguiPopover.Anchor>
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