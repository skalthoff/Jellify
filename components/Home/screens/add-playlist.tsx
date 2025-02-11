import { Label } from "../../../components/Global/helpers/text";
import Input from "../../../components/Global/helpers/input";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "tamagui";


export default function AddPlaylist() : React.JSX.Element {
    return (
        <View marginHorizontal={"$2"}>
            <Label size="$2" htmlFor="name">Name</Label>
            <Input id="name" />
        </View>
    )
}