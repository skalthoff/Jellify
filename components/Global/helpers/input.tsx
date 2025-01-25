import React from 'react';
import { Input as TamaguiInput, useTheme} from 'tamagui';

interface InputProps {
    onChangeText: (value: string | undefined) => void,
    placeholder: string
    value: string | undefined;
    secureTextEntry?: boolean | undefined;
    flexGrow?: boolean | undefined
}

export default function Input(props: InputProps): React.JSX.Element {

    const theme = useTheme();

    return (
        <TamaguiInput 
            placeholder={props.placeholder}
            onChangeText={props.onChangeText} 
            value={props.value}
            flexGrow={props.flexGrow ? 1 : "unset"}
            secureTextEntry={props.secureTextEntry}
            clearButtonMode="always"
        />
    )
}