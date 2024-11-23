import { StyleSheet } from "react-native"
import { H1, SizeTokens, Label as TamaguiLabel } from "tamagui"
import { Fonts } from '../../enums/assets/fonts';

export const styles = StyleSheet.create({
    heading: {
        fontFamily: Fonts.Black
    },
    label: {
        fontFamily: Fonts.Heavy
    },
    text: {
        fontFamily: Fonts.Regular
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
        <H1 marginVertical={30} size="$3" fontFamily={"$heading"}>{ children }</H1>
    )
}