import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useApiClientContext } from "../../jellyfin-api-provider";
import _ from "lodash";
import * as Keychain from "react-native-keychain"
import { JellyfinCredentials } from "../../../api/types/jellyfin-credentials";
import { View } from "tamagui";
import { useAuthenticationContext } from "../provider";
import { Heading } from "../../helpers/text";
import Button from "../../helpers/button";
import Input from "../../helpers/input";
import { mutateServer } from "../../../api/mutators/functions/storage";

export default function ServerAuthentication(): React.JSX.Element {
    const { username, setUsername, setChangeUsername, setServerAddress, setChangeServer, storedServer } = useAuthenticationContext();
    const [password, setPassword] = React.useState<string | undefined>('');

    const { apiClient, refetchApi } = useApiClientContext();

    const useApiMutation = useMutation({
        mutationFn: async (credentials: JellyfinCredentials) => {
            return await apiClient!.authenticateUserByName(credentials.username, credentials.password!);
        },
        onSuccess: async (authResult, credentials) => {
              
            console.log(`Received auth response from ${storedServer!.name}`)
            if (_.isUndefined(authResult))
                return Promise.reject(new Error("Authentication result was empty"))

            if (authResult.status >= 400 || _.isEmpty(authResult.data.AccessToken))
                return Promise.reject(new Error("Invalid credentials"))

            if (_.isUndefined(authResult.data.User))
                return Promise.reject(new Error("Unable to login"));

            console.log(`Successfully signed in to ${storedServer!.name}`)
            setUsername(credentials.username);
            setChangeUsername(false);
            await Keychain.setInternetCredentials(storedServer!.url, credentials.username, (authResult.data.AccessToken as string));
            return await refetchApi();
        },
        onError: async (error: Error) => {
            console.error("An error occurred connecting to the Jellyfin instance", error);
            return Promise.reject(`An error occured signing into ${storedServer!.name}`);
        }
    });

    return (
        <View marginHorizontal={10} flex={1} justifyContent='center'>
            <Heading>
                { `Sign in to ${storedServer?.name ?? "Jellyfin"}`}
            </Heading>
            <Button
                onPress={() => setChangeServer(true)}
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
                        console.log(`Signing in to ${storedServer!.name}`);
                        useApiMutation.mutate({ username, password });
                    }
                }}
                >
                    Sign in
            </Button>
        </View>
    );
}