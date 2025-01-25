import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useColorScheme } from "react-native";
import { ColorTokens, getTokens } from "tamagui";

const smallSize = 24;

const regularSize = 36;

const largeSize = 48

export default function Icon({ 
    name, onPress, 
    small, 
    large, 
    color 
}: { 
    name: string, 
    onPress?: () => void, 
    small?: boolean, 
    large?: boolean, 
    color?: ColorTokens
}) : React.JSX.Element {
    
    const isDarkMode = useColorScheme() === "dark"
    let size = large ? largeSize : small ? smallSize : regularSize
    
    return (
        <MaterialCommunityIcons 
            color={color ? color 
                : isDarkMode ? getTokens().color.$purpleGray.val 
                : getTokens().color.$purpleDark.val
            }
            name={name} 
            onPress={onPress}
            size={size}
        />
    )
}