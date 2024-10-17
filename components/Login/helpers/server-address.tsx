import React, { useState } from "react";
import _ from "lodash";
import { RadioGroup, RadioButton, TextField } from 'react-native-ui-lib';
import { Button, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const loginContext = useApiClientContext();

    const [protocol, setProtocol] = useState(https)
    const [serverAddress, setServerAddress] = useState("");

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
                url: serverAddress,
                name: publicSystemInfoResponse.data.ServerName!,
                version: publicSystemInfoResponse.data.Version!,
                startUpComplete: publicSystemInfoResponse.data.StartupWizardCompleted!
            }

            loginContext.setServer(jellifyServer);
            return mutateServer(jellifyServer);
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View>

            <RadioGroup 
                initialValue="https://" 
                onValueChange={setProtocol}>  
                <RadioButton 
                    value={https} 
                    label={"HTTPS"}
                />  
                <RadioButton 
                    value={http} 
                    label={'HTTP'}
                />
            </RadioGroup>
            <TextField 
                placeholder="jellyfin.org"
                onChangeText={setServerAddress}
                
                >
            </TextField>

            <Button 
                onPress={() => {
                    useServerMutation.mutate(`${protocol}${serverAddress}`);
                }}
                title="Connect"
            />

        </View>
    )
}