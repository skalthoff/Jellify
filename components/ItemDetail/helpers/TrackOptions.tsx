import Icon from "../../../components/Global/helpers/icon";
import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { XStack } from "tamagui";

export default function TrackOptions({ 
    item, 
    navigation 
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList> 
}) : React.JSX.Element {
    
    return (
        <XStack>
            <Icon name="table-column-plus-before" />

            <Icon name="table-column-plus-after" />
        </XStack>
    )
}