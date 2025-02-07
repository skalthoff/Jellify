import React from 'react';
import { Input as TamaguiInput, InputProps as TamaguiInputProps} from 'tamagui';

interface InputProps extends TamaguiInputProps {
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <TamaguiInput 
            {...props}
            clearButtonMode="always"
        />
    )
}