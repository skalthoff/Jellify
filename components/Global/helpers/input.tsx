import { Colors } from '../../../enums/colors';
import React, { SetStateAction } from 'react';
import { Input as TamaguiInput} from 'tamagui';

interface InputProps {
    onChangeText: React.Dispatch<SetStateAction<string | undefined>>,
    placeholder: string
    value: string | undefined;
    secureTextEntry?: boolean | undefined;
    flexGrow?: boolean | undefined
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <TamaguiInput 
            backgroundColor={Colors.Background}
            borderColor={Colors.Borders}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText} 
            value={props.value}
            flexGrow={props.flexGrow ? 1 : "unset"}
            secureTextEntry={props.secureTextEntry}
        />
    )
}