import { StyleSheet } from "react-native"
import { H1 } from "tamagui"

const styles = StyleSheet.create({
    text: {
        
    },
    heading: {
        fontFamily: 'Aileron-Black'
    }
})
export function Heading({ children }: { children: string }): React.JSX.Element {
    return (
        <H1 marginVertical={30} style={styles.heading}>{ children }</H1>
    )
}