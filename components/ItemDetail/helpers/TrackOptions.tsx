import { StackParamList } from "../../../components/types";
import { BaseItemDto } from "@jellyfin/sdk/lib/generated-client/models";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "tamagui";

export default function TrackOptions({ 
    item, 
    navigation 
} : { 
    item: BaseItemDto, 
    navigation: NativeStackNavigationProp<StackParamList> 
}) : React.JSX.Element {
    
    return (
        <View>
            
        </View>
    )
}