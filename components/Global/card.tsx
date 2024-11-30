import { ReactNode } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H3, Image, Card as TamaguiCard, ZStack } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { useApiClientContext } from "../jellyfin-api-provider";
import { cardDimensions } from "./component.config";
import { useImage } from "../../api/queries/image";
import { Colors } from "../../enums/colors";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { queryConfig } from "../../api/queries/query.config";

interface CardProps extends TamaguiCardProps {
    artistName?: string;
    children?: string;
    itemId: string;
    footer?: ReactNode;
}

export function Card(props: CardProps) {

    const { apiClient } = useApiClientContext();
    const { data, isPending, isSuccess } = useImage(apiClient!, props.itemId)

    const dimensions = props.artistName ? cardDimensions.artist : cardDimensions.album;

    return (
        <TamaguiCard 
            elevate 
            size="$4" 
            animation="bouncy"
            hoverStyle={props.onPress ? { scale: 0.925 } : {}}
            pressStyle={props.onPress ? { scale: 0.875 } : {}}
            borderRadius={25}
            {...dimensions}
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
                <ZStack>
                    <LinearGradient
                        colors={[isPending ? Colors.Primary : "$colorTransparent", "$black4"]}
                        start={[1, 1]}
                        end={[0,0]}
                    />

                    { isSuccess && data && (
                        <Image
                        alignSelf="center"
                        source={{
                            uri: getImageApi(apiClient!).getItemImageUrlById(
                                props.itemId, 
                                ImageType.Primary, 
                                { 
                                    format: queryConfig.images.format, 
                                    fillHeight: queryConfig.images.height,
                                    fillWidth: queryConfig.images.width
                                })
                        }} 
                        {...dimensions}
                        />
                    )}
                </ZStack>
            </TamaguiCard.Background>
        </TamaguiCard>
    )
  }
  