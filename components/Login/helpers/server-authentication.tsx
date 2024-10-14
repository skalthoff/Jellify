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
                onChangeText={(value) => setUsername(value)}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry
            />
            <Button title="Sign in" onPress={() => authenticateWithCredentials.mutate({username, password})} />
        </View>
    );
}