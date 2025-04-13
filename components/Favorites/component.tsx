import { FlatList, Text, View } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import IconCard from "../../components/Global/helpers/icon-card";
import { StackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Categories from "./categories";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Favorites({ 
    route, 
    navigation 
} : {
    route: RouteProp<StackParamList, "Favorites">,
    navigation: NativeStackNavigationProp<StackParamList, keyof StackParamList>
}): React.JSX.Element {

    const { width } = useSafeAreaFrame();
    const headerHeight = useHeaderHeight();

    return (
        <View style={{ paddingTop: headerHeight }} >
            <FlatList
                contentInsetAdjustmentBehavior="automatic"
                data={Categories}
                numColumns={2}
                renderItem={({ index, item }) =>
                        <IconCard 
                            name={item.iconName}
                            caption={`${item.name}`}
                            width={width / 2.1}
                            onPress={() => {
                                navigation.navigate(item.name, item.params)
                            }}
                            largeIcon
                        />
                }
            />
        </View>
    )
}