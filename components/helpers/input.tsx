import React, { SetStateAction } from 'react';
import { Input as TamaguiInput} from 'tamagui';
import { styles } from './text';

interface InputProps {
    onChangeText: React.Dispatch<SetStateAction<string | undefined>>,
    placeholder: string
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <TamaguiInput 
            style={styles.text}
            flexGrow={1}
            placeholder={props.placeholder}
            onChangeText={props.onChangeText} 
        />
    )
}