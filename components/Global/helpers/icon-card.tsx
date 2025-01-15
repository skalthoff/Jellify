import { Card, View } from "tamagui";
import { H5, Text } from "./text";

export default function IconCard({ 
    name, 
    onPress,
    caption,
    subCaption,
 }: { 
    name: string, 
    onPress: () => void,
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
                width={150}
                height={150}
                onPress={onPress}
            >
                <Card.Header>
                </Card.Header>
                <Card.Footer padded>
          
                </Card.Footer>
                <Card.Background>

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