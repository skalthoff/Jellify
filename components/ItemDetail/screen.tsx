import ItemDetail from "../../components/ItemDetail/component";
import { StackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

export default function DetailsScreen({
    route,
    navigation,
    onNavigate,
} : {
    route: RouteProp<StackParamList, "Details">,
    navigation: NativeStackNavigationProp<StackParamList>
    onNavigate?: () => void | undefined
}) : React.JSX.Element {
    return (
        <ItemDetail
            item={route.params.item}
            navigation={navigation}
            onNavigate={onNavigate}
        />
    )
}