import React from "react";
import { XStack, YStack } from "tamagui";
import Icon from "../../Global/helpers/icon";
import { H5, Text } from "../../../components/Global/helpers/text";
import Client from "../../../api/client";

export default function ServerDetails() : React.JSX.Element {
        
    return (
        <YStack>
            <YStack>
                <H5>Access Token</H5>
                <XStack>
                    <Icon name="hand-coin-outline" />
                    <Text>{Client.api!.accessToken}</Text>
                </XStack>
            </YStack>
            <YStack>
                <H5>Jellyfin Server</H5>
                <XStack>
                    <Icon name="server-network" />
                    <Text>{Client.api!.basePath}</Text>
                </XStack>
            </YStack>
        </YStack>
    )
}