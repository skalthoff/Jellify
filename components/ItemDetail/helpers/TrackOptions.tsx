import { usePlayerContext } from "../../../player/provider";
import { useItem } from "../../../api/queries/item";
import Icon from "../../../components/Global/helpers/icon";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { XStack } from "tamagui";
import { QueuingType } from "../../../enums/queuing-type";

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
    
    return (
        <XStack alignContent="flex-end" justifyContent="space-between">
            { isSuccess && (
                <Icon 
                    name="music-box"
                    onPress={() => {

                        if (isNested)
                            navigation.getParent()!.goBack();

                        navigation.goBack();
                        navigation.push("Album", {
                            album
                        });
                    }}
                />
            )}

            <Icon 
                name="table-column-plus-before" 
                onPress={() => {
                    useAddToQueue.mutate({
                        track: item,
                        queuingType: QueuingType.PlayingNext
                    })
                }}
            />

            <Icon 
                name="table-column-plus-after" 
                onPress={() => {
                    useAddToQueue.mutate({
                        track: item
                    })
                }}
            />
        </XStack>
    )
}