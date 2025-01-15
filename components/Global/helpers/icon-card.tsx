import { Card, View } from "tamagui";
import { H5, Text } from "./text";
import { Colors } from "@/enums/colors";
import Icon from "./icon";

export default function IconCard({ 
    name, 
    onPress,
    width,
    caption,
    subCaption,
 }: { 
    name: string, 
    onPress: () => void,
    width?: number | undefined,
    caption?: string | undefined,
    subCaption?: string | undefined
}) : React.JSX.Element {
    return (
        <View 
            alignItems="center"
            margin={5}
            >
            <Card 
                elevate 
                size="$4" 
                borderRadius={25}
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
          
                </Card.Footer>
                <Card.Background backgroundColor={Colors.Primary}>

                </Card.Background>
            </Card>
            { caption && (
                <View 
                    alignContent="center"
                    alignItems="center"
                >
                    <H5>
                        { caption }
                    </H5>
            
                    { subCaption && (
                        <Text
                            lineBreakStrategyIOS="standard"
                            numberOfLines={1}
                            textAlign="center"
                        >
                            { subCaption }
                        </Text>
                    )}
                </View>
            )}
        </View>
    )
}