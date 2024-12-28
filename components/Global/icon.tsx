import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useTheme } from "tamagui"
import { Colors } from "../../enums/colors"

const iconDimensions = {
    width: 50,
    height: 50
}

const largeDimensions = {
    width: 200,
    height: 200
}

export default function Icon({ name, onPress, large }: { name: string, onPress?: Function, large?: boolean }) : React.JSX.Element {
    
    const theme = useTheme();
    let dimensions = large ? largeDimensions : iconDimensions
    
    return (
        <MaterialCommunityIcons 
            color={Colors.White} 
            name={name} 
            onPress={() => {
                if (onPress)
                    onPress();
            }}
            {...dimensions} 
        />
    )
}