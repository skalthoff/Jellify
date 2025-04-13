import { useSafeAreaFrame } from "react-native-safe-area-context";
import Categories from "../categories";
import { StackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "tamagui";
import Button from "../../Global/helpers/button";
import { StyleSheet } from "react-native";
import { useMemo, useState } from "react";

const styles = StyleSheet.create({
    headerFix: {
        marginHorizontal: -11, 
        paddingLeft: 11,
    },
    spacer: {
        width: 11
    },
    container: {
        justifyContent: 'center',
    }
});

export default function LibraryTopBar({ 
    route, 
    navigation 
} : {
    route: RouteProp<StackParamList, keyof StackParamList>,
    navigation: NativeStackNavigationProp<StackParamList, keyof StackParamList>;
}): React.JSX.Element {
    const { width } = useSafeAreaFrame();
    const [isNavigating, setIsNavigating] = useState(false);

    const buttons = useMemo(() => 
        Categories.map((item) => (
            <Button
                key={item.name}
                focus={route.name.toLowerCase() === item.name.toLowerCase()}
                disabled={isNavigating}
                onPress={() => {
                    if (!isNavigating) {
                        setIsNavigating(true);
                        navigation.navigate(item.name, item.params);
                        // Reset disabled state after a short delay to ensure UI feedback
                        setTimeout(() => setIsNavigating(false), 300);
                    }
                }}
            >
                {item.name}
            </Button>
        )), 
        [route.name, navigation, isNavigating]
    );

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 6
                }}
                style={styles.headerFix}
            >
                {buttons}
                <View style={styles.spacer} />
            </ScrollView>
        </View>
    )
}