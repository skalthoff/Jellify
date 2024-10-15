import React, { useState } from "react";
import { validateServerUrl } from "../utils/validation";
import _ from "lodash";
import { Button, Input, YStack } from "tamagui";
import { Jellyfin } from "@jellyfin/sdk";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api/queries";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { useToastController } from "@tamagui/toast";

export default function ServerAddress(): React.JSX.Element {

    const toast = useToastController();

    const [serverUrl, setServerUrl] = useState("");

    const serverUrlMutation = useMutation({
        mutationFn: async (serverUrl: string | undefined) => {
    
            console.log("Mutating server URL");
    
            if (!!!serverUrl)
                throw Error("Server URL was empty")
    
            let jellyfin = new Jellyfin(client);
            let api = jellyfin.createApi(serverUrl);

            console.log(`Created API client for ${api.basePath}`)
            return await getSystemApi(api).getPublicSystemInfo()
        },
        onSuccess: (publicSystemInfoResponse, serverUrl, context) => {
            if (!!!publicSystemInfoResponse.data.Version)
                throw new Error("Unable to connect to Jellyfin Server");
    
            console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);
            return AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, serverUrl!);
        },
        onError: (error: Error) => {
            toast.show("An Error Occurred", { message: "An occur occurred connecting to the Jellyfin instance"})
            console.error("An error occurred connecting to the Jellyfin instance", error);
        }
    });

    return (
        <YStack>
            <Input 
                placeholder="Jellyfin Server Address"
                onChangeText={(value) => validateServerUrl(value) ?? setServerUrl(value)}
                padding="$2"
                borderRadius="$2">
                </Input>

            <Button 
                onPress={() => serverUrlMutation.mutate(serverUrl)}
                disabled={_.isEmpty(serverUrl) || serverUrlMutation.isPending}>
                    Connect
            </Button>
        </YStack>
    )
}