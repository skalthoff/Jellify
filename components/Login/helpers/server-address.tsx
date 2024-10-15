import React, { useState } from "react";
import { validateServerUrl } from "../utils/validation";
import _ from "lodash";
import { Jellyfin } from "@jellyfin/sdk";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api/queries";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { ActivityIndicator } from "react-native";
import { Button, TextField, View } from "react-native-ui-lib";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    const serverUrlMutation = useMutation({
        mutationFn: async () => {
    
            console.log("Mutating server URL");
    
            if (!!!serverUrl)
                throw Error("Server URL is empty")
    
            let jellyfin = new Jellyfin(client);
            let api = jellyfin.createApi(serverUrl);

            console.log(`Created API client for ${api.basePath}`)
            return await getSystemApi(api).getPublicSystemInfo()
        },
        onSuccess: (publicSystemInfoResponse, serverUrl, context) => {
            if (!!!publicSystemInfoResponse.data.Version)
                throw new Error("Jellyfin instance did not respond");
    
            console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);
            return AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, serverUrl!);
        },
        onError: (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
        }
    });

    return (
        <View>
            <TextField 
                placeholder="Jellyfin Server Address"
                onChangeText={(value) => validateServerUrl(value) ?? setServerUrl(value)}>
                </TextField>

            <Button 
                onPress={() => serverUrlMutation.mutate()}
                label="Connect"
            />
        </View>
    )
}