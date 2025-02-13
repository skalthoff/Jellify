import React from 'react';
import { Input as TamaguiInput, InputProps as TamaguiInputProps, XStack, YStack} from 'tamagui';

interface InputProps extends TamaguiInputProps {
    prependElement?: React.JSX.Element | undefined;
}

export default function Input(props: InputProps): React.JSX.Element {

    return (
        <XStack alignItems='center'>

            
            { props.prependElement && (
                <YStack 
                    flex={1} 
                    alignItems='flex-end' 
                    marginRight={"$2"}
                    justifyContent='center'
                >
                    { props.prependElement }

                </YStack>
            )}

            <TamaguiInput 
                flex={props.prependElement ? 5 : 1}
                {...props}
                clearButtonMode="always"
            />
        </XStack>
    )
}