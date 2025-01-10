import React from "react";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { XStack, YStack } from "tamagui";
import Icon from "../../Global/helpers/icon";
import { H5, Text } from "@/components/Global/helpers/text";

export default function ServerDetails() : React.JSX.Element {
    
    const { apiClient } = useApiClientContext();
    
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
                    <Text>{apiClient!.basePath}</Text>
                </XStack>
            </YStack>
        </YStack>
    )
}