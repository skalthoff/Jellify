import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { jellifyStyles } from "../../styles";
import _ from "lodash";
import * as Keychain from "react-native-keychain"
import { client } from "../../../api/queries";
import { JellyfinCredentials } from "../../../api/types/jellyfin-credentials";
import { Button, Input, Paragraph, View } from "tamagui";

export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { apiClient, setApiClient, server, setServer, setChangeServer, setUsername: setContextUsername } = useApiClientContext();

    const useApiMutation = useMutation({
        mutationFn: async (credentials: JellyfinCredentials) => {
            return await apiClient!.authenticateUserByName(credentials.username, credentials.password!);
        },
        onSuccess: async (authResult, credentials) => {
              
            console.log(`Received auth response from ${server!.name}`)
            if (_.isUndefined(authResult))
                return Promise.reject(new Error("Authentication result was empty"))

            if (authResult.status >= 400 || _.isEmpty(authResult.data.AccessToken))
                return Promise.reject(new Error("Invalid credentials"))

            if (_.isUndefined(authResult.data.User))
                return Promise.reject(new Error("Unable to login"));

            setApiClient(client.createApi(server!.url, (authResult.data.AccessToken as string)))
            setUsername(authResult.data.User.Name!);
            return await Keychain.setInternetCredentials(server!.url, credentials.username, (authResult.data.AccessToken as string));

        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    const clearServer = useMutation({
        mutationFn: async () => {
            setServer(undefined);
            setContextUsername(undefined);
            setChangeServer(true);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });

    return (
        <View style={jellifyStyles.container}>
            <Paragraph fontSize={25} fontWeight={800}>Sign in to {server?.name ?? "Jellyfin"}</Paragraph>
            <Button
                onPress={() => {
                    clearServer.mutate();
                }}
                >Switch Server
            </Button>

            <Input
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                />
            <Input
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry
                />

            <Button 
                onPress={() => {
                    console.log(`Signing in to ${server!.name}`);
                    useApiMutation.mutate({ username, password })
                }}
                >
                    Sign in
            </Button>
        </View>
    );
}