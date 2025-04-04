import React from "react"
import { StackParamList } from "../types"
import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import Favorites from "./component"

export default function FavoritesScreen({
    route,
    navigation
} : {
    route: RouteProp<StackParamList, "Favorites">,
    navigation: NativeStackNavigationProp<StackParamList, "Artists", undefined>
}) : React.JSX.Element {
    return (
        <Favorites route={route} navigation={navigation}/>
    )
}