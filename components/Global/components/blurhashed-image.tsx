import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { useItemImage } from "../../../api/queries/image";
import { Blurhash } from "react-native-blurhash";
import { View } from "tamagui";
import { isEmpty } from "lodash";
import { Image } from "react-native";

interface BlurhashLoadingProps {
    item: BaseItemDto;
    width: number;
    height?: number;
    type?: ImageType; 
    borderRadius?: number | undefined
}

export default function BlurhashedImage({ 
    item, 
    width, 
    height,
    type,
    borderRadius
} : BlurhashLoadingProps) : React.JSX.Element {

    const { data: image, isSuccess } = useItemImage(item.Id!, type, width, height ?? width);

    const blurhash = !isEmpty(item.ImageBlurHashes) 
        && !isEmpty(type ? item.ImageBlurHashes[type] : item.ImageBlurHashes.Primary) 
        ? Object.values(type ? item.ImageBlurHashes[type]! : item.ImageBlurHashes.Primary!)[0]
        : undefined;

    return (
        <View minHeight={height ?? width} minWidth={width} borderRadius={borderRadius ? borderRadius : 25}>

            { isSuccess ? (
                <Image 
                    source={{
                        uri: image
                    }}
                    style={{
                        height: height ?? width,
                        width,
                        borderRadius: borderRadius ? borderRadius : 25,
                        resizeMode: "contain"
                    }} 
                />
            ) : blurhash && (
                <Blurhash blurhash={blurhash!} style={{ 
                    height: height ?? width, 
                    width: width,
                    borderRadius: borderRadius ? borderRadius : 25 
                }} />
            )
        }
        </View>
    )
}