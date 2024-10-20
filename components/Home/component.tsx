import { H1, ScrollView, YStack } from "tamagui";
import { useApiClientContext } from "../jellyfin-api-provider";
import _ from "lodash";


export default function Home(): React.JSX.Element {

    const { apiClient, username } = useApiClientContext();

    return (
        <ScrollView paddingLeft={10}>
            <YStack alignContent='flex-start'>
                <H1>Hi { _.isUndefined(username) ? "there" : `, ${username}`}</H1>
            </YStack>
        </ScrollView>
    );
}