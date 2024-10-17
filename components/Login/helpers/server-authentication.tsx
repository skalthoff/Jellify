import React, { useEffect } from "react";
import { Button, TextInput, useColorScheme, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { useApiClientContext } from "../../jellyfin-api-provider";


export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isDarkMode = useColorScheme() === 'dark';

    const loginContext = useApiClientContext();
    
    useEffect(() => {
        loginContext.setChangeServer(false);
    });

    const clearServer = useMutation({
        mutationFn: async () => {
            loginContext.setServer(undefined)
            loginContext.setChangeServer(true);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    })

    return (
        <View>
            <Button
                title="Change Server"
                onPress={() => {
                    clearServer.mutate();
                }}
                color={'purple'}
                />

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry
                />

            <Button 
                title="Sign in" 
                color={'purple'}
                onPress={() => console.log("sign in pressed")}
                />
        </View>
    );
}