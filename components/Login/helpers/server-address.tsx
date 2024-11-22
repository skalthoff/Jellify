import React, { useState } from "react";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { MMKVStorageKeys } from "../../../enums/mmkv-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { View, XStack } from "tamagui";
import { SwitchWithLabel } from "../../helpers/switch-with-label";
import { useAuthenticationContext } from "../provider";
import { Heading } from "../../helpers/text";
import Input from "../../helpers/input";
import Button from "../../helpers/button";
import { http, https } from "../utils/constants";
import { storage } from "../../../constants/storage";

export default function ServerAddress(): React.JSX.Element {

    const { setServer } = useApiClientContext();

    const [useHttps, setUseHttps] = useState<boolean>(true);
    const [serverAddress, setServerAddress] = useState<string | undefined>(undefined);

    const useServerMutation = useMutation({
        mutationFn: serverMutation,
        onSuccess: async (publicSystemInfoResponse, serverUrl) => {
            if (!!!publicSystemInfoResponse.data.Version)
                throw new Error("Jellyfin instance did not respond");
    
            console.debug("REMOVE THIS::onSuccess variable", serverUrl);
            console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);
    
            let jellifyServer: JellifyServer = {
                url: `${useHttps ? https : http}${serverAddress!}`,
                address: serverAddress!,
                name: publicSystemInfoResponse.data.ServerName!,
                version: publicSystemInfoResponse.data.Version!,
                startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
            }

            setServer(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return storage.set(MMKVStorageKeys.Server, "");
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
                    label="Use HTTPS" 
                    size="$2"
                    width={100} />
                
                <Input 
                    value={serverAddress}
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress} />
            </XStack>
            <Button 
                disabled={_.isEmpty(serverAddress)}
                onPress={() => {
                    useServerMutation.mutate(`${useHttps ? "https" : "http"}://${serverAddress}`);
                }}>
                Connect
            </Button>
        </View>
    )
}