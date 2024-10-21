import React, { useState } from "react";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { Button, useTheme, View, XStack } from "tamagui";
import { SwitchWithLabel } from "../../helpers/switch-with-label";
import { buildApiClient } from "../../../api/client";
import { useAuthenticationContext } from "../provider";
import { Heading } from "../../helpers/text";
import Input from "../../helpers/input";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const { setServer, setApiClient } = useApiClientContext();
    const { serverAddress, setServerAddress } = useAuthenticationContext();

    const [useHttps, setUseHttps] = useState(true)

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
                url: serverAddress!,
                name: publicSystemInfoResponse.data.ServerName!,
                version: publicSystemInfoResponse.data.Version!,
                startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
            }

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
            <Heading>
                Connect to Jellyfin
            </Heading>
            <XStack>
                <SwitchWithLabel 
                    checked={useHttps} 
                    onCheckedChange={(checked) => setUseHttps(checked)} 
                    label="HTTPS" 
                    size="$2"
                    width={150} />
                
                <Input 
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress} />
            </XStack>
            <Button 
                disabled={_.isEmpty(serverAddress)}
                marginVertical={30}
                onPress={() => {
                    useServerMutation.mutate(`${useHttps ? "https" : "http"}://${serverAddress}`);
                }}>
                Connect
            </Button>
        </View>
    )
}