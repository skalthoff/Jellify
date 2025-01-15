import React from "react"
import { StackParamList } from "../types"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Albums from "./component"

export default function AlbumScreen({
    route,
    navigation
} : {
    route: RouteProp<StackParamList, "Albums">,
    navigation: NativeStackNavigationProp<StackParamList, "Albums", undefined>
}) : React.JSX.Element {
    return (
        <Albums route={route} navigation={navigation}/>
    )
}