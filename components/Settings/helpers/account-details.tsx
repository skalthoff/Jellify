import { XStack } from "@tamagui/stacks";
import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import Avatar from "../../Global/avatar";
import { Text } from "tamagui";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function AccountDetails(): React.JSX.Element {

    const { user } = useApiClientContext();

    return (

        <XStack>
            <MaterialCommunityIcons name="account-music-outline" />
            <Text>{user!.name}</Text>
            <Avatar itemId={user!.id} circular />
        </XStack>
    )
}

