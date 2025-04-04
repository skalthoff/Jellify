import { useSafeAreaFrame } from "react-native-safe-area-context";
import Categories from "./categories";
import { StackParamList } from "../../components/types";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, View } from "tamagui";
import Button from "../Global/helpers/button";
import { StyleSheet } from "react-native";

export default function LibraryTopBar({ 
    route, 
    navigation 
} : {
    route: RouteProp<StackParamList, keyof StackParamList>,
    navigation: NativeStackNavigationProp<StackParamList, keyof StackParamList>;
}): React.JSX.Element {

    const { width } = useSafeAreaFrame();

    // janky fix to hardcoded margin on react navigation parent container see:
    // https://github.com/react-navigation/react-navigation/blob/d814a40e3e632ca67b1e92ff4f3086a80638cc1a/packages/elements/src/Header/HeaderBackButton.tsx#L192C8-L192C8
    // issue found on android, need to test to see if this is an issue on ios
    const styles = StyleSheet.create({
        headerFix: {
            marginHorizontal: -11, 
            paddingLeft: 11,
        },
        spacer: {
            width: 11
        }
    })

    return (
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 6
            }}
            style={styles.headerFix}
        >
            {
                Categories.map((item, index) => {
                    return <>
                        <Button key={index} focus={route.name.toLowerCase() === item.name.toLowerCase() ? true : false}>
                            {item.name}
                        </Button>
                    </>
                })
            }
            <View style={styles.spacer} />
        </ScrollView>
    )
}