import { Colors } from "@/enums/colors";
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
            placement="top"
            size="$5"
            onOpenChange={() => trigger("impactLight")} 
            open={props.open}
        >
            <TamaguiPopover.Anchor>
                { props.anchor }
            </TamaguiPopover.Anchor>
      
            <TamaguiPopover.Content>
            <TamaguiPopover.Arrow />
            <TamaguiPopover.Close />
            <View 
                backgroundColor={Colors.Background}
                borderColor={Colors.Secondary}
            >
                { props.children }
            </View>
          </TamaguiPopover.Content>
      </TamaguiPopover>
    )
}