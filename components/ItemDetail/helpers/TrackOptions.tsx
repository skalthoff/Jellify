import { usePlayerContext } from "../../../player/provider";
import { useItem } from "../../../api/queries/item";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Spacer, XStack, YStack } from "tamagui";
import { QueuingType } from "../../../enums/queuing-type";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import IconButton from "../../../components/Global/helpers/icon-button";

export default function TrackOptions({ 
    item, 
    navigation,
    isNested
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList>,
    isNested: boolean | undefined// Whether this is nested in the player modal
}) : React.JSX.Element {

    const { data: album, isSuccess } = useItem(item.AlbumId ?? "");

    const { useAddToQueue } = usePlayerContext();

    const { width } = useSafeAreaFrame();
    
    return (
        <YStack width={width}>

            <XStack 
            >
                { isSuccess ? (
                    <IconButton 
                        name="music-box"
                        title="Go to Album"
                        onPress={() => {
                            
                            if (isNested)
                                navigation.getParent()!.goBack();
                            
                            navigation.goBack();
                            navigation.push("Album", {
                                album
                            });
                        }}
                        size={width / 5}
                    />
                ) : (
                    <Spacer />
                )}

                <IconButton
                    circular
                    name="table-column-plus-before" 
                    title="Play Next"
                    onPress={() => {
                        useAddToQueue.mutate({
                            track: item,
                            queuingType: QueuingType.PlayingNext
                        })
                    }}
                    size={width / 5}
                />

                <IconButton
                    circular
                    name="table-column-plus-after" 
                    title="Queue"
                    onPress={() => {
                        useAddToQueue.mutate({
                            track: item
                        })
                    }}
                    size={width / 5}
                />
            </XStack>
        </YStack>
    )
}