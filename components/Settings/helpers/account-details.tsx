import { XStack } from "@tamagui/stacks";
import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Avatar from "@/components/Global/helpers/avatar";
import { Text } from "@/components/Global/helpers/text";

export default function AccountDetails(): React.JSX.Element {

    const { user } = useApiClientContext();

    return (

        <XStack alignItems="center">
            <MaterialCommunityIcons name="account-music-outline" />
            <Text>{user!.name}</Text>
            <Avatar itemId={user!.id} circular />
        </XStack>
    )
}

