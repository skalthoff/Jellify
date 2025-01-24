import { useItem } from "../../../api/queries/item";
import Icon from "../../../components/Global/helpers/icon";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { XStack } from "tamagui";

export default function TrackOptions({ 
    item, 
    navigation,
    isModal = false,
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList>,
    isModal: boolean
}) : React.JSX.Element {

    const { data: album, isSuccess } = useItem(item.AlbumId ?? "")
    
    return (
        <XStack alignContent="flex-end" justifyContent="space-between">
            { isSuccess && (
                <Icon 
                    name="music-box"
                    onPress={() => {

                        if (isModal) {
                            navigation.navigate("Album", {
                                album
                            });
                        } else {

                            navigation.goBack();
                            navigation.push("Album", {
                                album
                            });
                        }
                    }}
                />
            )}

            <Icon 
                name="table-column-plus-before" 
            />

            <Icon 
                name="table-column-plus-after" 
            />
        </XStack>
    )
}