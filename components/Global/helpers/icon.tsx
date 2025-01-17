import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../../../enums/colors"
import { useColorScheme } from "react-native";

const smallSize = 24;

const regularSize = 36;

const largeSize = 48

export default function Icon({ name, onPress, small, large, color }: { name: string, onPress?: () => void, small?: boolean, large?: boolean, color?: Colors }) : React.JSX.Element {
    
    const isDarkMode = useColorScheme() === "dark"
    let size = large ? largeSize : small ? smallSize : regularSize
    
    return (
        <MaterialCommunityIcons 
            color={color ? color : isDarkMode ? Colors.White : Colors.Background}
            name={name} 
            onPress={onPress}
            size={size}
        />
    )
}