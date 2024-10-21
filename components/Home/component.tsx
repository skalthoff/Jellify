import { H1, ScrollView, YStack } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import _ from "lodash";


export default function Home(): React.JSX.Element {

    const { apiClient } = useApiClientContext();

    return (
        <ScrollView paddingLeft={10}>
            <YStack alignContent='flex-start'>
                <H1>Hi there</H1>
            </YStack>
        </ScrollView>
    );
}