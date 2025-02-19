import React from "react";
import Client from "../../../api/client";
import { Text } from "react-native";
import { Icon } from "react-native-vector-icons/Icon";
import { YStack, XStack } from "tamagui";
import { H5 } from "../../../components/Global/helpers/text";

export default function ServerDetails() : React.JSX.Element {
    return (
        <YStack>
            { Client.api && (
                <YStack>
                    <H5>Access Token</H5>
                    <XStack>
                        <Icon name="hand-coin-outline" />
                        <Text>{Client.api!.accessToken}</Text>
                    </XStack>
                    <H5>Jellyfin Server</H5>
                    <XStack>
                        <Icon name="server-network" />
                        <Text>{Client.api!.basePath}</Text>
                    </XStack>
                </YStack>
            )}
        </YStack>
    )
}