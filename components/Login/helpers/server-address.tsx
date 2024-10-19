import React, { useState } from "react";
import _ from "lodash";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Button, Input, SizableText, useTheme, View, YStack, Stack, XStack, getFontSizeToken, Paragraph } from "tamagui";
import { CheckboxWithLabel } from "../../helpers/checkbox-with-label";
import { SwitchWithLabel } from "../../helpers/switch-with-label";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const { setChangeServer, setServer } = useApiClientContext();

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
            return await mutateServer(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View flex={1} justifyContent='center'>
            <Paragraph fontSize={25} fontWeight={800}>Connect to Jellyfin</Paragraph>
            <XStack>
                <SwitchWithLabel 
                    checked={useHttps} 
                    onCheckedChange={(checked) => setUseHttps(checked)} 
                    label="HTTPS" 
                    size="$2"
                    width={100} />
                <Input 
                    width={400}
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress} />
            </XStack>
            <Button 
                onPress={() => {
                    useServerMutation.mutate(`${useHttps ? "https" : "http"}://${serverAddress}`);
                }}>
                Connect
            </Button>
        </View>
    )
}