import Client from "@/api/client";
import { useItemImage } from "@/api/queries/image";
import { Blurhash } from "react-native-blurhash";
import { Image, View } from "tamagui";

interface BlurhashLoadingProps {
    itemId: string;
    blurhash: string;
    size: number
}

export default function BlurhashLoading(props: BlurhashLoadingProps) : React.JSX.Element {

    const { data: image, isSuccess } = useItemImage(Client.api!, props.itemId);

    return (
        <View minHeight={props.size}>

            { isSuccess ? (
                <Image 
                    src={image}
                    style={{
                        height: props.size,
                        width: props.size,
                    }} 
                />
            ) : (
                <Blurhash blurhash={props.blurhash} style={{ flex: 1 }} />
            )
        }
        </View>
    )
}