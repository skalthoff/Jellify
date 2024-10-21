import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClientContext } from "../../jellyfin-api-provider";
import _ from "lodash";
import * as Keychain from "react-native-keychain"
import { JellyfinCredentials } from "../../../api/types/jellyfin-credentials";
import { Button, H2, Input, View } from "tamagui";
import { client } from "../../../api/client";
import { useAuthenticationContext } from "../provider";

export default function ServerAuthentication(): React.JSX.Element {
    const { username, setUsername, setServerAddress } = useAuthenticationContext();
    const [password, setPassword] = React.useState('');

    const { apiClient, setApiClient, server, setUsername: setClientUsername } = useApiClientContext();

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

            console.log(`Successfully signed in to ${server!.name}`)
            setUsername(credentials.username);
            setClientUsername(credentials.username);
            setApiClient(client.createApi(server!.url, (authResult.data.AccessToken as string)))
            return await Keychain.setInternetCredentials(server!.url, credentials.username, (authResult.data.AccessToken as string));

        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return Promise.reject(`An error occured signing into ${server!.name}`);
        }
    });

    const clearServer = useMutation({
        mutationFn: async () => {
            setServerAddress(undefined);
            setApiClient(undefined);
            return Promise.resolve();
        }
    });

    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <H2 marginVertical={30}>
                Sign in to {server?.name ?? "Jellyfin"}
            </H2>
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
                disabled={_.isEmpty(username) || _.isEmpty(password)}
                onPress={() => {

                    if (!_.isUndefined(username)) {
                        console.log(`Signing in to ${server!.name}`);
                        useApiMutation.mutate({ username, password })
                    }
                }}
                >
                    Sign in
            </Button>
        </View>
    );
}