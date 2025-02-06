import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../types";
import Playlists from "./component";
import React from "react";

export default function PlaylistsScreen(
    props: NativeStackScreenProps<StackParamList, 'Playlists'>
) : React.JSX.Element {
    return (
        <Playlists {...props} />
    )
}