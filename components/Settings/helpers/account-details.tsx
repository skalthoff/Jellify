import { XStack } from "@tamagui/stacks";
import React from "react";
import { Avatar } from "tamagui";
import { Colors } from "../../../enums/colors";
import { useApiClientContext } from "../../jellyfin-api-provider";

export default function AccountDetails(): React.JSX.Element {

    const {  } = useApiClientContext();

    return (
        <XStack>
            <Avatar circular>
                <Avatar.Image src=""/>

                <Avatar.Fallback backgroundColor={Colors.Secondary}/>
            </Avatar>
        </XStack>
    )
}