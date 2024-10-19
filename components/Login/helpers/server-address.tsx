import React, { useState } from "react";
import _ from "lodash";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Button, Input, SizableText, useTheme, View, YStack, Stack, XStack, getFontSizeToken, Paragraph, H2 } from "tamagui";
import { CheckboxWithLabel } from "../../helpers/checkbox-with-label";
import { SwitchWithLabel } from "../../helpers/switch-with-label";
import { buildApiClient } from "../../../api/client";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const { setChangeServer, setServer, setApiClient } = useApiClientContext();

    const [useHttps, setUseHttps] = useState(true)
    const [serverAddress, setServerAddress] = useState("");

    const theme = useTheme();

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
            setApiClient(buildApiClient(serverUrl));
            return await mutateServer(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <H2 marginVertical={30}>
                Connect to Jellyfin
            </H2>
            <XStack>
                <SwitchWithLabel 
                    checked={useHttps} 
                    onCheckedChange={(checked) => setUseHttps(checked)} 
                    label="HTTPS" 
                    size="$2"
                    width={150} />
                <Input 
                    flexGrow={1}
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress} />
            </XStack>
            <Button 
                marginVertical={30}
                onPress={() => {
                    useServerMutation.mutate(`${useHttps ? "https" : "http"}://${serverAddress}`);
                }}>
                Connect
            </Button>
        </View>
    )
}