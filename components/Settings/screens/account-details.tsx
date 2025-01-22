import { StackParamList } from "../../../components/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function AccountDetails({
    navigation
} : {
    navigation: NativeStackNavigationProp<StackParamList>
 }) : React.JSX.Element {

    return (
        <AccountDetails navigation={navigation} />
    )
 }