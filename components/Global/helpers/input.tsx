import React from 'react';
import { Input as TamaguiInput, InputProps as TamaguiInputProps} from 'tamagui';

interface InputProps extends TamaguiInputProps {
}

export default function Input(props: InputProps): React.JSX.Element {

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