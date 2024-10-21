import { StyleSheet } from "react-native"
import { H1, SizeTokens, Label as TamaguiLabel } from "tamagui"

const styles = StyleSheet.create({
    heading: {
        fontFamily: 'Aileron-Black'
    },
    label: {
        fontFamily: 'Aileron-SemiBold'
    },
    text: {
        fontFamily: 'Aileron-Regular'
    },
});

interface LabelProps {
    htmlFor: string,
    children: string,
    size: SizeTokens
}

export function Label(props: LabelProps): React.JSX.Element {
    return (
        <TamaguiLabel htmlFor={props.htmlFor} justifyContent="flex-end">{ props.children }</TamaguiLabel>
    )
}

export function Heading({ children }: { children: string }): React.JSX.Element {
    return (
        <H1 marginVertical={30} style={styles.heading}>{ children }</H1>
    )
}