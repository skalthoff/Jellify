import { BaseItemDto, ImageType } from "@jellyfin/sdk/lib/generated-client/models";
import { useItemImage } from "../../../api/queries/image";
import { Blurhash } from "react-native-blurhash";
import { Image, View } from "tamagui";
import { isEmpty } from "lodash";

interface BlurhashLoadingProps {
    item: BaseItemDto;
    size: number
}

export default function BlurhashedImage({ item, size, type }: { item: BaseItemDto, size: number, type?: ImageType }) : React.JSX.Element {

    const { data: image, isSuccess } = useItemImage(item.Id!, type);

    const blurhash = !isEmpty(item.ImageBlurHashes) 
        && !isEmpty(item.ImageBlurHashes.Primary) 
        ? Object.values(item.ImageBlurHashes.Primary)[0] 
        : undefined;

    return (
        <View minHeight={size}>

            { isSuccess ? (
                <Image 
                    src={image}
                    style={{
                        height: size,
                        width: size,
                    }} 
                />
            ) : blurhash && (
                <Blurhash blurhash={blurhash!} style={{ flex: 1 }} />
            )
        }
        </View>
    )
}