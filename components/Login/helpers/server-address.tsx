import React, { useState } from "react";
import _ from "lodash";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import ServerIcon from "../../icons/server-icon";
import { jellifyStyles } from "../../styles";
import { Button, Card, getThemes, Input, RadioGroup, SizableText, Text, useTheme, View, YStack } from "tamagui";
import { CheckboxWithLabel } from "../../helpers/checkbox-with-label";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const { setChangeServer, setServer } = useApiClientContext();

    const [useHttps, setUseHttps] = useState(true)
    const [serverAddress, setServerAddress] = useState("");

    const isDarkMode = useColorScheme() === 'dark';

    const useServerMutation = useMutation({
        mutationFn: serverMutation,
        onSuccess: async (publicSystemInfoResponse, serverUrl) => {
            if (!!!publicSystemInfoResponse.data.Version)
                throw new Error("Jellyfin instance did not respond");
    
            console.debug("REMOVE THIS::onSuccess variable", serverUrl);
            console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);
    
            // TODO: Store these along side address
            // TODO: Rename url to address
            
            let jellifyServer: JellifyServer = {
                url: serverAddress,
                name: publicSystemInfoResponse.data.ServerName!,
                version: publicSystemInfoResponse.data.Version!,
                startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
            }

            setChangeServer(false);
            setServer(jellifyServer);
            return await mutateServer(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View theme={isDarkMode ? 'dark' : 'light'} style={jellifyStyles.container}>
            <YStack alignContent="center">
                <SizableText size="$4" fontWeight="800">Connect to Jellyfin</SizableText>
                <SizableText color="$color" style={{ fontSize: 20 }}>
                    Protocol
                </SizableText>
                <CheckboxWithLabel size="$3" defaultChecked />
                <Input 
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress}
                    >
                </Input>

                <Button 
                    onPress={() => {
                        useServerMutation.mutate(`${useHttps ? "https" : "http"}://${serverAddress}`);
                    }}>
                    Connect
                </Button>
            </YStack>
            <Card>
                <Text>Please</Text>
            </Card>
        </View>
    )
}