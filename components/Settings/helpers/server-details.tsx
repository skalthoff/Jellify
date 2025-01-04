import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { H5, Text, XStack, YStack } from "tamagui";
import { Colors } from "../../../enums/colors";
import Icon from "../../Global/icon";

export default function ServerDetails() : React.JSX.Element {
    
    const { server, apiClient } = useApiClientContext();
    
    return (
        <YStack>
            <YStack>
                <H5>Access Token</H5>
                <XStack>
                    <Icon name="hand-coin-outline" />
                    <Text>{apiClient!.accessToken}</Text>
                </XStack>
            </YStack>
            <YStack>
                <H5>Jellyfin Server</H5>
                <XStack>
                    <Icon name="server-network" />
                    <Text>{server!.url}</Text>
                </XStack>
            </YStack>
        </YStack>
    )
}