import React, {  } from "react";
import type { CardProps as TamaguiCardProps } from "tamagui"
import { H5, Card as TamaguiCard, View } from "tamagui";
import { getImageApi } from "@jellyfin/sdk/lib/utils/api";
import { ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { CachedImage } from "@georstat/react-native-image-cache";
import invert from "invert-color"
import { Blurhash } from "react-native-blurhash"
import { QueryConfig } from "../../../api/queries/query.config";
import { Text } from "./text";
import Client from "../../../api/client";

interface CardProps extends TamaguiCardProps {
    artistName?: string;
    blurhash?: string;
    caption?: string | null | undefined;
    subCaption?: string | null | undefined;
    itemId: string;
    cornered?: boolean;
}

export function ItemCard(props: CardProps) {

    const dimensions = props.width && typeof(props.width) === "number" ? { width: props.width, height: props.width } : { width: 150, height: 150 };

    const cardTextColor = props.blurhash ? invert(Blurhash.getAverageColor(props.blurhash)!, true) : undefined;

    const logoDimensions = props.width && typeof(props.width) === "number" ? { width: props.width / 2, height: props.width / 2 }: { width: 100, height: 100 };
    const cardLogoSource = getImageApi(Client.api!).getItemImageUrlById(props.itemId, ImageType.Logo);

    return (
        <View 
            alignItems="center"
            margin={5}
            >
            <TamaguiCard 
                size="$4" 
                borderRadius={props.cornered ? 2 : 25}
                animation="bouncy"
                hoverStyle={props.onPress ? { scale: 0.925 } : {}}
                pressStyle={props.onPress ? { scale: 0.875 } : {}}
                width={props.width ?? 150}
                height={props.width ?? 150}
                {...props}
            >
                <TamaguiCard.Header>
                </TamaguiCard.Header>
                <TamaguiCard.Footer padded>
                    <CachedImage 
                            source={getImageApi(Client.api!)
                                .getItemImageUrlById(
                                    props.itemId, 
                                    ImageType.Logo, 
                                    { ...QueryConfig.logos})
                                } 
                            imageStyle={{
                                ...logoDimensions,
                                position: "relative",
                                shadowRadius: 2,
                                shadowOffset: {
                                    width: 2,
                                    height: 2,
                                },
                                borderRadius: props.cornered ? 2 : 25
                            }}
                    />
                </TamaguiCard.Footer>
                <TamaguiCard.Background>
                    <CachedImage 
                        source={getImageApi(Client.api!)
                            .getItemImageUrlById(
                                props.itemId, 
                                ImageType.Primary, 
                                { ...QueryConfig.images})
                            } 
                        imageStyle={{
                            ...dimensions,
                            borderRadius: props.cornered ? 2 : 25
                        }}
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
                        lineBreakStrategyIOS="standard"
                        numberOfLines={1}
                    >
                        { props.caption }
                    </H5>
            
                    { props.subCaption && (
                        <Text
                            lineBreakStrategyIOS="standard"
                            numberOfLines={1}
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
