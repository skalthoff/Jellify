import React from "react";
import { Button, TextInput, useColorScheme, View } from "react-native";


export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View>
            <Button
                title="Change Server"
                onPress={() => console.log("change server requested")}
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