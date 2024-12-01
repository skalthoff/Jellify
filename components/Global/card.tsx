import React, { ReactNode, useState } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H3, Card as TamaguiCard } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import { cardDimensions } from "./component.config";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { CachedImage } from "@georstat/react-native-image-cache";
import invert from "invert-color"
import { Blurhash } from "react-native-blurhash"
import { queryConfig } from "../../api/queries/query.config";

interface CardProps extends TamaguiCardProps {
    artistName?: string;
    blurhash?: string;
    children?: string;
    itemId: string;
    footer?: ReactNode;
    cornered?: boolean;
}

export function Card(props: CardProps) {

    const { apiClient } = useApiClientContext();

    const [imageLoaded, setImageLoaded] = useState<boolean>(false); 
    const dimensions = props.artistName ? cardDimensions.artist : cardDimensions.album;

    const cardTextColor = props.blurhash ? invert(Blurhash.getAverageColor(props.blurhash)!, true) : undefined;

    return (
        <TamaguiCard 
            elevate 
            size="$4" 
            animation="bouncy"
            hoverStyle={props.onPress ? { scale: 0.925 } : {}}
            pressStyle={props.onPress ? { scale: 0.875 } : {}}
            borderRadius={props.cornered ? 5 : 25}
            {...dimensions}
            {...props}
        >
            <TamaguiCard.Header padded>
            { props.children && (
                <H3 color={cardTextColor}>{ props.children }</H3>
            )}
            </TamaguiCard.Header>
            <TamaguiCard.Footer padded>
            { props.footer && (
                props.footer
            )}
            </TamaguiCard.Footer>
            <TamaguiCard.Background>
                {props.blurhash && !imageLoaded && (
                    <Blurhash
                        decodeWidth={dimensions.width}
                        decodeHeight={dimensions.height}
                        blurhash={props.blurhash}
                    />
                )}

                <CachedImage 
                    source={getImageApi(apiClient!)
                        .getItemImageUrlById(
                            props.itemId, 
                            ImageType.Primary, 
                            { ...queryConfig.images})
                    } 
                    imageStyle={{
                        ...dimensions,
                        borderRadius: 25
                    }}
                    onLoadEnd={() => setImageLoaded(true)}
                />
            </TamaguiCard.Background>
        </TamaguiCard>
    )
  }
  