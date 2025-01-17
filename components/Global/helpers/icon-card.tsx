import { Card, View } from "tamagui";
import { H2, H5, Text } from "./text";
import { Colors } from "@/enums/colors";
import Icon from "./icon";

export default function IconCard({ 
    name, 
    onPress,
    width,
    caption,
 }: { 
    name: string, 
    onPress: () => void,
    width?: number | undefined,
    caption?: string | undefined,
}) : React.JSX.Element {
    return (
        <View 
            alignItems="center"
            margin={5}
            >
            <Card 
                elevate 
                borderRadius={"$7"}
                animation="bouncy"
                hoverStyle={{ scale: 0.925 }}
                pressStyle={{ scale: 0.875 }}
                width={width ? width : 150}
                height={width ? width : 150}
                onPress={onPress}
            >
                <Card.Header>
                    <Icon color={Colors.Background} name={name} large />
                </Card.Header>
                <Card.Footer padded>
                    <H2 color={Colors.Background}>{ caption }</H2>
                </Card.Footer>
                <Card.Background backgroundColor={Colors.Primary}>

                </Card.Background>
            </Card>
        </View>
    )
}