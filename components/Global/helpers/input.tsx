import React from 'react';
import { Input as TamaguiInput, InputProps as TamaguiInputProps, XStack, YStack} from 'tamagui';

interface InputProps extends TamaguiInputProps {
    prependElement?: React.JSX.Element | undefined;
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <XStack>

            { props.prependElement && (
                props.prependElement
            )}
            
            <YStack 
                flex={1} 
                alignContent='center' 
                justifyContent='center'
            >

            </YStack>

            <TamaguiInput 
                flex={4}
                {...props}
                clearButtonMode="always"
            />
        </XStack>
    )
}