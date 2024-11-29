import { ReactNode } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H3, Image, Card as TamaguiCard } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import { cardDimensions } from "./component.config";

interface CardProps extends TamaguiCardProps {
    children?: string;
    itemId: string;
    footer?: ReactNode;
}

export function Card(props: CardProps) {

    const { server } = useApiClientContext();

    return (
        <TamaguiCard 
            elevate 
            size="$4" 
            animation="bouncy"
            hoverStyle={props.onPress ? { scale: 0.925 } : {}}
            pressStyle={props.onPress ? { scale: 0.875 } : {}}
            borderRadius={25}
            {...cardDimensions}
            {...props}
        >
            <TamaguiCard.Header padded>
            { props.children && (
                <H3>{ props.children }</H3>
            )}
            </TamaguiCard.Header>
            <TamaguiCard.Footer padded>
            { props.footer && (
                props.footer
            )}
            </TamaguiCard.Footer>
            <TamaguiCard.Background>
                <Image
                alignSelf="center"
                source={{
                    uri: `${server!.url}/Items/${props.itemId}/Images/Primary`,
                }}
                />
            </TamaguiCard.Background>
        </TamaguiCard>
    )
  }
  