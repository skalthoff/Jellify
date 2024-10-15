import React from "react";
import { useColorScheme } from "react-native";
import { View, TextField, Button, ActionBar } from "react-native-ui-lib";


export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const isDarkMode = useColorScheme() === 'dark';

    return (
        <>
        <ActionBar
            actions={[
                {
                    label: 'Change Server', 
                    onPress: () => console.log("change server requested")
                }
            ]}/>
        <View useSafeArea>
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
                backgroundColor={isDarkMode ? 'black' : 'white'}
                label="Sign in" 
                onPress={() => console.log("sign in pressed")}
            />
        </View>
        </>
    );
}