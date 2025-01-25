import React from "react";
import { Square, Theme } from "tamagui";
import Icon from "./icon";

interface IconButtonProps {
    onPress: () => void;
    name: string;
    size?: number;
}

export default function IconButton({
    name,
    onPress,
    size
} : IconButtonProps) : React.JSX.Element {

    return (
        <Theme name={"purple"}>

            <Square
                animation={"quick"}
                elevate
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                onPress={onPress}
                width={size}
                height={size}
                alignContent="center"
                justifyContent="center"
                backgroundColor={"$borderColor"}
                >
                    <Icon 
                        large
                        name={name} 
                        color={"$color"}
                    />
            </Square>
        </Theme>
    )
}