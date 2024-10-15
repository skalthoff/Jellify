import React, { useState } from "react";
import _ from "lodash";
import { Jellyfin } from "@jellyfin/sdk";
import { getSystemApi } from "@jellyfin/sdk/lib/utils/api/system-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../api/queries";
import { AsyncStorageKeys } from "../../../enums/async-storage-keys";
import { Button, TextField, View } from "react-native-ui-lib";
import { JellifyServer } from "../../../types/JellifyServer";
import { serverUrlMutation } from "../../../api/mutators/storage";

export default function ServerAddress(): React.JSX.Element {

    const [serverUrl, setServerUrl] = useState("");

    const [storeUrl, setStoreUrl] = useState("");

    return (
        <View useSafeArea>
            <TextField 
                placeholder="Jellyfin Server Address"
                onChangeText={setServerUrl}>
            </TextField>

            <Button 
                onPress={() => serverUrlMutation.mutate(serverUrl)}
                label="Connect"
            />
        </View>
    )
}