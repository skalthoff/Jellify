import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import Tracks from "./component";

export default function TracksScreen({
    route,
    navigation
} : {
    route: RouteProp<StackParamList, "Tracks">,
    navigation: NativeStackNavigationProp<StackParamList, "Tracks", undefined>
}) : React.JSX.Element {
    return (
        <Tracks route={route} navigation={navigation} />
    )
}