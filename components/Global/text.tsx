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
    bold?: boolean | undefined
    children: string;
    width?: number;
    textAlign?: "left" | "right" | "unset" | "auto" | "center" | "justify" | undefined;
}

export function Text(props: TextProps): React.JSX.Element {
    return (
        <Paragraph 
            width={props.width} 
            fontWeight={props.bold ? 800 : 600} 
            textAlign={props.textAlign}
            fontSize="$4"
            lineBreakMode="clip"
        >
            { props.children }
        </Paragraph>
    )
}