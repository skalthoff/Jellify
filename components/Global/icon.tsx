import React from "react"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors } from "react-native/Libraries/NewAppScreen"

const iconDimensions = {
    width: 25,
    height: 25
}

export default function Icon({ name }: { name: string }) : React.JSX.Element {
    return <MaterialCommunityIcons color={Colors.Primary} name={name} {...iconDimensions} />

}