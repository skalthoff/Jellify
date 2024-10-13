import React from "react";
import { View, TextInput, Button } from "react-native";
import { authenticateWithCredentials } from "../../../api/mutators/auth";


export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => signInHandler(username, password)} />
        </View>
    );
}

function signInHandler(username: string, password: string) {
    return authenticateWithCredentials.mutate({username, password})
}