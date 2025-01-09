import { XStack } from "@tamagui/stacks";
import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import Avatar from "@/components/Global/helpers/avatar";
import { Text } from "@/components/Global/helpers/text";
import Icon from "@/components/Global/helpers/icon";

export default function AccountDetails(): React.JSX.Element {

    const { user } = useApiClientContext();

    return (

        <XStack alignItems="center">
            <Icon name="account-music-outline" />
            <Text>{user!.name}</Text>
            <Avatar itemId={user!.id} circular />
        </XStack>
    )
}

