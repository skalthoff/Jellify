import { Label } from "../../../components/Global/helpers/text";
import Input from "../../../components/Global/helpers/input";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AddPlaylist() : React.JSX.Element {
    return (
        <SafeAreaView>
            <Label size="$2" htmlFor="name">Name</Label>
            <Input id="name" />
        </SafeAreaView>
    )
}