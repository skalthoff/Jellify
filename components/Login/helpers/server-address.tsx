import React, { useState } from "react";
import _ from "lodash";
import { RadioGroup, RadioButton, TextField, View, Button, Card, Colors } from 'react-native-ui-lib';
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { JellifyServer } from "../../../types/JellifyServer";
import { mutateServer, serverMutation } from "../../../api/mutators/functions/storage";
import { useApiClientContext } from "../../jellyfin-api-provider";
import ServerIcon from "../../icons/server-icon";

const http = "http://"
const https = "https://"

export default function ServerAddress(): React.JSX.Element {

    const { setChangeServer, setServer } = useApiClientContext();

    const [protocol, setProtocol] = useState(https)
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
        <View margin paddingH>
            <View marginV paddingV>
                <RadioGroup 
                    initialValue="https://" 
                    onValueChange={setProtocol}>  
                    <RadioButton 
                        value={https} 
                        label={"HTTPS"}
                        labelStyle={{color: Colors.$textDefault, fontSize: 12}}
                    />  
                    <RadioButton 
                        value={http} 
                        label={'HTTP'}
                        labelStyle={{color: Colors.$textDefault, fontSize: 12}}
                    />
                </RadioGroup>
            </View>
            <View marginV paddingV>
                <TextField 
                    placeholder="jellyfin.org"
                    onChangeText={setServerAddress}
                    showClearButton
                    leadingAccessory={ServerIcon()}
                    color={Colors.$textDefault}
                    labelStyle={{ fontSize: 12 }}
                    marginV
                    paddingV
                    >
                </TextField>

                <Button 
                    onPress={() => {
                        useServerMutation.mutate(`${protocol}${serverAddress}`);
                    }}
                    size={Button.sizes.medium}
                    margin
                    label="Connect"
                />
            </View>

        </View>
    )
}