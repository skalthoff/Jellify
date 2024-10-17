import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { useApiClientContext } from "../../jellyfin-api-provider";
import { RadioGroup, RadioButton, TextField, View, Button, Card, Colors } from 'react-native-ui-lib';

export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isDarkMode = useColorScheme() === 'dark';

    const { setServer, setChangeServer } = useApiClientContext();

    const clearServer = useMutation({
        mutationFn: async () => {
            setServer(undefined)
            setChangeServer(true);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    })

    return (
        <View>
            <Button
                label="Switch Server"
                onPress={() => {
                    clearServer.mutate();
                }}
                color={Colors.$iconDanger}
                />

            <TextField
                placeholder="Username"
                value={username}
                onChangeText={(value) => setUsername(value)}
                />
            <TextField
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry
                />

            <Button 
                label="Sign in" 
                color={Colors.$iconPrimary}
                onPress={() => console.log("sign in pressed")}
                size={Button.sizes.medium}
                margin
                />
        </View>
    );
}