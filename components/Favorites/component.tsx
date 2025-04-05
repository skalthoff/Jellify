import { FlatList, Text } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import IconCard from "../../components/Global/helpers/icon-card";
import { StackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "tamagui";
import Button from "../Global/helpers/button";
import Categories from "./categories";
import LibraryTopBar from "../Library/component";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Favorites({ 
    route, 
    navigation 
} : {
    route: RouteProp<StackParamList, "Favorites">,
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {

    const { width } = useSafeAreaFrame();
    const headerHeight = useHeaderHeight();

    return (
        <FlatList
            style={{ paddingTop: headerHeight }}
            contentInsetAdjustmentBehavior="automatic"
            data={Categories}
            numColumns={2}
            renderItem={({ index, item }) =>
                    <IconCard 
                        name={item.iconName}
                        caption={`Favorite ${item.name}`}
                        width={width / 2.1}
                        onPress={() => {
                            navigation.navigate(item.name, item.params)
                        }}
                        largeIcon
                    />
            }
        />
    )
}