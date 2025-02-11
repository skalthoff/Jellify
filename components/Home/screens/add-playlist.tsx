import { Label } from "../../../components/Global/helpers/text";
import Input from "../../../components/Global/helpers/input";
import React from "react";
import { View } from "tamagui";


export default function AddPlaylist() : React.JSX.Element {
    return (
        <View>
            <Label size="$2" htmlFor="name">Name</Label>
            <Input id="name" />
        </View>
    )
}