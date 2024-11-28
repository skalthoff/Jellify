import { H1 as TamaguiH1, H2 as TamaguiH2, SizeTokens, Label as TamaguiLabel, H5, Paragraph } from "tamagui"

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

export function H1({ children }: { children: string }): React.JSX.Element {
    return (
        <TamaguiH1 marginBottom={10}>{ children }</TamaguiH1>
    )
}

export function H2({ children }: { children: string }): React.JSX.Element {
    return (
        <TamaguiH2 marginVertical={5}>{ children }</TamaguiH2>
    )
}

interface TextProps {
    children: string;
    width?: number;
}

export function Text(props: TextProps): React.JSX.Element {
    return (
        <Paragraph width={props.width} fontWeight={600} fontSize="$3">
            { props.children }
        </Paragraph>
    )
}