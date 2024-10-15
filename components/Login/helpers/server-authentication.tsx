import React from "react";
import { View, TextField, Button, ActionBar } from "react-native-ui-lib";


export default function ServerAuthentication(): React.JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View>
            <ActionBar
                actions={[
                    {
                        label: 'Change Server', 
                        onPress: () => console.log("change server requested")
                    }
                ]}/>
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
            <Button label="Sign in" onPress={() => console.log("sign in pressed")} />
        </View>
    );
}