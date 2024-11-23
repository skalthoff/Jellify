import { H1, ScrollView, YStack } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import _ from "lodash";
import { Heading } from "../helpers/text";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentlyPlayed from "./helpers/recently-played";


export default function Home(): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    return (
            <ScrollView paddingLeft={10}>
                <YStack alignContent='flex-start'>
                    <Heading>Hi there</Heading>
                    
                    <RecentlyPlayed />
                </YStack>
            </ScrollView>
    );
}