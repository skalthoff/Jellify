import React, { useContext, useState } from "react";
import _ from "lodash";
import { Button, TextInput, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { serverMutation } from "../../../api/mutators/functions/storage";
import { useServer } from "../../../api/queries/keychain";
import { LoginContext } from "../../contexts";

export default function ServerAddress(): React.JSX.Element {

    const loginContext = useContext(LoginContext);

    const [serverUrl, setServerUrl] = useState(useServer.data?.url ?? "");

    const isDarkMode = useColorScheme() === 'dark';

    const useServerMutation = useMutation({
        mutationFn: serverMutation,
        onSuccess: (publicSystemInfoResponse, serverUrl, context) => {
            if (!!!publicSystemInfoResponse.data.Version)
                throw new Error("Jellyfin instance did not respond");
    
            console.debug("REMOVE THIS::onSuccess variable", serverUrl);
            console.log(`Connected to Jellyfin ${publicSystemInfoResponse.data.Version!}`);
    
            // TODO: Store these along side address
            // TODO: Rename url to address
            
            let jellifyServer: JellifyServer = {
                url: serverUrl,
                name: publicSystemInfoResponse.data.ServerName!,
                version: publicSystemInfoResponse.data.Version!,
                startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
            }
            loginContext.loginContextFns.setServerFn(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View>
            <TextInput 
                placeholder="Jellyfin Server Address"
                onChangeText={setServerUrl}>
            </TextInput>

            <Button 
                onPress={() => useServerMutation.mutate(serverUrl)}
                title="Connect"
            />

        </View>
    )
}