import React, { SetStateAction } from 'react';
import { StyleProp } from 'react-native';
import { Input as TamaguiInput, TextStyle} from 'tamagui';

interface InputProps {
    onChangeText: React.Dispatch<SetStateAction<string | undefined>>,
    placeholder: string
    value: string | undefined;
    secureTextEntry?: boolean | undefined;
    width?: number | undefined;
    flex?: number | "unset" | undefined;
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <TamaguiInput 
            placeholder={props.placeholder}
            onChangeText={props.onChangeText} 
            value={props.value}
            width={props.width}
            flex={props.flex}
            secureTextEntry={props.secureTextEntry}
        />
    )
}