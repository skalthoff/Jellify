import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "react-native/Libraries/NewAppScreen"

const iconDimensions = {
    width: 50,
    height: 50
}

const largeDimensions = {
    width: 100,
    height: 100
}

export default function Icon({ name, onPress, large }: { name: string, onPress?: Function, large?: boolean }) : React.JSX.Element {
    
    let dimensions = large ? largeDimensions : iconDimensions
    
    return (
        <MaterialCommunityIcons 
            color={Colors.Primary} 
            name={name} 
            onPress={() => {
                if (onPress)
                    onPress();
            }}
            {...dimensions} 
        />
    )
}