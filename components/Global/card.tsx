import React, { ReactNode, useState } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H3, H5, Card as TamaguiCard, View } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import { cardDimensions } from "./component.config";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { CachedImage } from "@georstat/react-native-image-cache";
import invert from "invert-color"
import { Blurhash } from "react-native-blurhash"
import { queryConfig } from "../../api/queries/query.config";
import { Text } from "./text";

interface CardProps extends TamaguiCardProps {
    artistName?: string;
    blurhash?: string;
    caption?: string | null | undefined;
    subCaption?: string | null | undefined;
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
        <View alignItems="center">
            <TamaguiCard 
                elevate 
                size="$4" 
                animation="bouncy"
                hoverStyle={props.onPress ? { scale: 0.925 } : {}}
                pressStyle={props.onPress ? { scale: 0.875 } : {}}
                borderRadius={props.cornered ? 2 : 25}
                width={props.width ?? 150}
                height={props.width ?? 150 + 50}
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
                            blurhash={props.blurhash}
                            {...dimensions}
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
                            borderRadius: props.cornered ? 2 : 25
                        }}
                        onLoadEnd={() => setImageLoaded(true)}
                        />
                </TamaguiCard.Background>
            </TamaguiCard>
            { props.caption && (
                <View 
                    alignContent="center"
                    alignItems="center"
                    width={dimensions.width}
                >
                    <H5 
                        textAlign="center"
                        lineBreakStrategyIOS="standard"
                        numberOfLines={1}
                    >
                        { props.caption }
                    </H5>

                    { props.subCaption && (
                        <Text
                            textAlign="center"
                        >
                            { props.subCaption }
                        </Text>
                    )}
                </View>
            )}
        </View>
    )
  }
  