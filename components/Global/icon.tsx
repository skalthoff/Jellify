import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "../../enums/colors"

const iconDimensions = {
    width: 75,
    height: 75
}

const largeDimensions = {
    width: 150,
    height: 150
}

export default function Icon({ name, onPress, large }: { name: string, onPress?: Function, large?: boolean }) : React.JSX.Element {
    
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