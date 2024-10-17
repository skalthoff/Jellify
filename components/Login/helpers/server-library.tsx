import { useMutation } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import { Button, Colors, Text } from "react-native-ui-lib";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { useApiClientContext } from "../../jellyfin-api-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ServerLibrary(): React.JSX.Element {

    const { setServer, setChangeServer, setUsername } = useApiClientContext();

    const clearServer = useMutation({
        mutationFn: async () => {
            setServer(undefined)
            setUsername(undefined)
            setChangeServer(true);
            return await AsyncStorage.setItem(AsyncStorageKeys.ServerUrl, "");
        }
    });
    return (
        <View>
            <Text style={{fontSize: 30 }}>Select Music Library</Text>

            <Button
                label="Switch Server"
                onPress={() => {
                    clearServer.mutate();
                }}
                backgroundColor={Colors.$iconDanger}
                color={Colors.$white}
                />

        </View>
    )
}