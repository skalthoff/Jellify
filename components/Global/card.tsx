import { ReactNode } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H2, Image, Paragraph, Card as TamaguiCard } from "tamagui";
import { useItemImage } from "../../api/queries/image";
import { useApiClientContext } from "../jellyfin-api-provider";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { cardDimensions } from "./component.config";

interface CardProps extends TamaguiCardProps {
    children?: string;
    itemId: string;
    footer?: ReactNode;
}

export function Card(props: CardProps) {

    const { apiClient } = useApiClientContext();
    const { data, isPending } = useItemImage(apiClient!, props.itemId, ImageType.Primary, cardDimensions.width)

    return (
      <TamaguiCard 
        elevate 
        size="$4" 
        animation="bouncy"
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        {...cardDimensions}
        {...props}
    >
        <TamaguiCard.Header padded>
          { props.children && (
              <H2>{ props.children }</H2>
          )}
        </TamaguiCard.Header>
        <TamaguiCard.Footer padded>
          { props.footer && (
            props.footer
          )}
        </TamaguiCard.Footer>
        <TamaguiCard.Background>
          { data && (

              <Image
              alignSelf="center"
              source={{
                  uri: data?.data,
                  ...cardDimensions
                }}
                />
        )}
        </TamaguiCard.Background>
      </TamaguiCard>
    )
  }
  