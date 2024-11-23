import { H1, ScrollView, YStack } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import _ from "lodash";
import { Heading } from "../helpers/text";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home(): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    return (
        <SafeAreaView>
            <ScrollView paddingLeft={10}>
                <YStack alignContent='flex-start'>
                    <Heading>Hi there</Heading>
                    <ScrollView horizontal>

                    </ScrollView>
                </YStack>
            </ScrollView>
        </SafeAreaView>
    );
}