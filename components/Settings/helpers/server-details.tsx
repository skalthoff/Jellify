import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { XStack, YStack } from "tamagui";
import { Colors } from "../../../enums/colors";

export default function ServerDetails() : React.JSX.Element {
    
    const { server, apiClient } = useApiClientContext();
    
    return (
        <YStack>
            <XStack>
                <MaterialCommunityIcons color={Colors.Primary} name="hand-coin-outline" />
            </XStack>
            <XStack>
                <MaterialCommunityIcons color={Colors.Primary} name="server-network" />
                <Text>{server!.url}</Text>
            </XStack>
        </YStack>
    )
}