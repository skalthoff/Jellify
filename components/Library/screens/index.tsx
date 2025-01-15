import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Categories from "./categories";
import IconCard from "@/components/Global/helpers/icon-card";
import { StackParamList } from "@/components/types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function LibraryScreen({ 
    route, 
    navigation 
} : {
    route: RouteProp<StackParamList, "Library">,
    navigation: NativeStackNavigationProp<StackParamList>
}): React.JSX.Element {
    return (
        <SafeAreaView>
            <FlatList
                data={Categories}
                numColumns={2}
                renderItem={({ index, item }) => {
                    return (
                        <IconCard 
                            name={item.iconName}
                            onPress={() => {
                                navigation.navigate(item.name)
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}